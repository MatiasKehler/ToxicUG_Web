from django.contrib import admin
from .models import Perfil, HistorialDKP

# --- ACCIONES MASIVAS (ACTIONS) ---

@admin.action(description='🎁 Dar 100 DKP (Bonus Raid)')
def dar_bonus_raid(modeladmin, request, queryset):
    count = 0
    for perfil in queryset:
        HistorialDKP.objects.create(
            perfil=perfil,
            evento="Bonus Raid (Masivo)",
            cantidad=100
        )
        count += 1
    modeladmin.message_user(request, f"¡Éxito! Se entregaron 100 DKP a {count} jugadores.")

@admin.action(description='⚠️ Multa por Toxicidad (-50 DKP)')
def aplicar_multa(modeladmin, request, queryset):
    count = 0
    for perfil in queryset:
        HistorialDKP.objects.create(
            perfil=perfil,
            evento="Sanción disciplinaria",
            cantidad=-50
        )
        count += 1
    modeladmin.message_user(request, f"Se aplicó la multa a {count} jugadores.")


# --- CONFIGURACIÓN DE TABLAS ---

@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    # Columnas que verás en la tabla principal (fusionadas)
    list_display = ('usuario', 'rango', 'dkp_actuales', 'asistencia_porcentaje', 'aprobado')
    
    # Filtros laterales para buscar rápido
    list_filter = ('aprobado', 'rango', 'asistencia_porcentaje')
    
    # Checkbox editable directo desde la tabla
    list_editable = ('aprobado',)
    
    # Barra de búsqueda
    search_fields = ('usuario__username', 'discord_id')
    
    # Acciones masivas de DKP
    actions = [dar_bonus_raid, aplicar_multa]
    
    # Paginación
    list_per_page = 20


@admin.register(HistorialDKP)
class HistorialAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'perfil', 'evento', 'cantidad')
    list_filter = ('fecha', 'evento')
    search_fields = ('perfil__usuario__username', 'evento')
    date_hierarchy = 'fecha' # Agrega una barra de navegación por fechas arriba