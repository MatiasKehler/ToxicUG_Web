import os
from pathlib import Path

# --- RUTA BASE DEL PROYECTO ---
BASE_DIR = Path(__file__).resolve().parent.parent

# --- SEGURIDAD ---
# IMPORTANTE: En un futuro, estas dos variables deberían venir de un archivo .env oculto
SECRET_KEY = 'django-insecure-no#e7=x^qc))bieg6#yczea69tsi=&ynnwty2vor5+jx=t#5fd'
DEBUG = True

# Permitimos localhost y cualquier subdominio de pythonanywhere
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '.pythonanywhere.com']

# --- APLICACIONES ---
INSTALLED_APPS = [
    # Apps de Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    # --- ALLAUTH (Para Discord) ---
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.discord',
    
    # Mis Apps
    'web',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

ROOT_URLCONF = 'toxic_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'web' / 'templates'], # Django buscará automáticamente en las carpetas 'templates' de cada app
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'toxic_project.wsgi.application'

# --- BASE DE DATOS ---
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# --- VALIDACIÓN DE CONTRASEÑAS ---
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# --- CONFIGURACIÓN DE ALLAUTH ---
SITE_ID = 1

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend', # Login normal
    'allauth.account.auth_backends.AuthenticationBackend', # Login Social
]

# Redirecciones
LOGIN_REDIRECT_URL = 'panel'   # A dónde va al iniciar sesión con éxito
LOGOUT_REDIRECT_URL = 'index'  # A dónde va al cerrar sesión
ACCOUNT_LOGOUT_ON_GET = True   # Cierra sesión directo sin preguntar "¿Estás seguro?"
SOCIALACCOUNT_LOGIN_ON_GET = True
ACCOUNT_MESSAGES = False

# Opciones de Discord Allauth
SOCIALACCOUNT_PROVIDERS = {
    'discord': {
        # Queremos pedirle el email y que nos confirme quién es
        'SCOPE': ['identify', 'email'],
    }
}

# --- IDIOMA Y ZONA HORARIA ---
LANGUAGE_CODE = 'es-ar'
TIME_ZONE = 'America/Argentina/Buenos_Aires'
USE_I18N = True
USE_TZ = True

# --- ARCHIVOS ESTÁTICOS (CSS, Imágenes) ---
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# --- REDIRECCIONES Y LOGIN ---
LOGIN_URL = 'login'