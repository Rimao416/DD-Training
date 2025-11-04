from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q, Count
from django.utils import timezone
from .models import Article, Category, Tag

def home(request):
    articles=Article.objects.filter(status='published').select_related('author','category').prefetch_related('tags')[:6]
    featured=Article.objects.filter(status='published').order_by('-views').first()
    categories=Category.objects.annotate(article_count=Count('articles',filter=Q(articles__status='published')))
    
    context={
        'articles':articles,
        'featured':featured,
        'categories':categories
    }
    return render(request,'blog/home.html',context)
    
    