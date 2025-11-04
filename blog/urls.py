from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    # Pages principales
    path('', views.home, name='home'),
    path('articles/', views.article_list, name='article_list'),
    path('mes-articles/', views.my_articles, name='my_articles'),
    path('contact/', views.contact, name='contact'),
    path('a-propos/', views.about, name='about'),
    
    # CRUD Articles
    path('article/nouveau/', views.article_create, name='article_create'),
    path('article/<slug:slug>/', views.article_detail, name='article_detail'),
    path('article/<slug:slug>/modifier/', views.article_update, name='article_update'),
    path('article/<slug:slug>/supprimer/', views.article_delete, name='article_delete'),
    
    # Filtres
    # path('categorie/<slug:slug>/', views.category_articles, name='category_articles'),
    # path('tag/<slug:slug>/', views.tag_articles, name='tag_articles'),
]