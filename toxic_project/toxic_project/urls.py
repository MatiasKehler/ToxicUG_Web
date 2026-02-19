from django.contrib import admin
from django.urls import path, include

# Lista maestra de rutas
urlpatterns = [
    path('admin/', admin.site.urls), # Panel de administración (Dios)
    path('', include('web.urls')),   # Rutas de nuestra App "Web"

    # URLS DE ALLAUTH (Login social)
    path('accounts/', include('allauth.urls')),
]