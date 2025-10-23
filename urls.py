from django.urls import path
from . import views

urlpatterns = [
    path('alassane', views.dire_bonjour, name='bonjour'),
]
