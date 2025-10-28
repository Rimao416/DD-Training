from django.urls import path
from . import views

urlpatterns=[
    path('',views.accueil,name="accueil"),
    path('apropos/',views.apropos,name="apropos"),
    path('services/',views.services,name="services"),
    path('contact/',views.contact,name="contact"),
    path('blog/',views.blog,name="blog"),
    path('blog/article/<int:id>',views.article_detail,name="article_detail"),
    
]