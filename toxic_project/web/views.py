from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.utils import timezone
from datetime import timedelta
from django.contrib import messages
from .models import Perfil, HistorialDKP

# ========================================================
# 1. VISTAS DE AUTENTICACIÓN (CLASES)
# ========================================================

class CustomLoginView(LoginView):
    """
    Vista de Login personalizada con seguridad anti-bruteforce y bloqueo de Discord.
    """
    template_name = 'web/login.html'
    redirect_authenticated_user = True

    def dispatch(self, request, *args, **kwargs):
        # A. VERIFICAR SI ESTÁ BLOQUEADO POR TIEMPO
        blocked_time_str = request.session.get('login_blocked_until')
        
        if blocked_time_str:
            blocked_until = timezone.datetime.fromisoformat(blocked_time_str)
            if timezone.now() < blocked_until:
                remaining_minutes = int((blocked_until - timezone.now()).total_seconds() / 60) + 1
                messages.error(request, f"LOCKED|{remaining_minutes}")
                # MAGIA SENIOR: Retornamos la vista avisando que está bloqueado
                return render(request, self.template_name, {
                    'form': self.get_form(),
                    'is_blocked': True  # <-- Enviamos esta señal al HTML
                })
            else:
                self._reset_login_attempts(request)

        return super().dispatch(request, *args, **kwargs)

    def form_invalid(self, form):
        # B. GESTIÓN DE INTENTOS FALLIDOS
        attempts = self.request.session.get('login_attempts', 0) + 1
        self.request.session['login_attempts'] = attempts
        
        limit = 3
        remaining = limit - attempts

        if attempts >= limit:
            # CASO: BLOQUEO
            block_time = timezone.now() + timedelta(minutes=5)
            self.request.session['login_blocked_until'] = block_time.isoformat()
            messages.error(self.request, "MAX_ATTEMPTS|5")
            # MAGIA SENIOR: Bloqueamos inmediatamente en el 3er intento fallido
            return render(self.request, self.template_name, {
                'form': form,
                'is_blocked': True  # <-- Enviamos esta señal al HTML
            })
        else:
            # CASO: ADVERTENCIA
            msg_text = f"Te queda 1 intento." if remaining == 1 else f"Te quedan {remaining} intentos."
            messages.warning(self.request, f"WARNING|{remaining}")

        return super().form_invalid(form)

    def form_valid(self, form):
        self._reset_login_attempts(self.request)
        return super().form_valid(form)

    def _reset_login_attempts(self, request):
        if 'login_attempts' in request.session:
            del request.session['login_attempts']
        if 'login_blocked_until' in request.session:
            del request.session['login_blocked_until']

# ========================================================
# 2. VISTAS FUNCIONALES
# ========================================================

def index(request):
    return render(request, 'web/index.html')

@login_required
def panel(request):
    context = {}
    
    try:
        perfil_usuario = Perfil.objects.get(usuario=request.user)
    except Perfil.DoesNotExist:
        # MAGIA: Si entra por primera vez con Discord y no tiene perfil, se lo creamos automáticamente (pero desactivado)
        perfil_usuario = Perfil.objects.create(usuario=request.user)

    # Validamos si está aprobado (Tú, al ser superuser, siempre tendrás acceso)
    if not perfil_usuario.aprobado and not request.user.is_superuser:
        context['esperando_aprobacion'] = True
        return render(request, 'web/panel.html', context)
        
    # Si la cuenta está aprobada, cargamos el panel normal
    historial = HistorialDKP.objects.filter(perfil=perfil_usuario).order_by('-fecha')[:10]
    context = {'perfil': perfil_usuario, 'historial': historial}
    
    return render(request, 'web/panel.html', context)

def salir(request):
    logout(request)
    return redirect('index')