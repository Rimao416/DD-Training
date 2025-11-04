from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.urls import reverse

class Category(models.Model):
    name=models.CharField(max_length=100,unique=True,verbose_name="Nom")
    slug=models.SlugField(max_length=100,unique=True)
    description=models.TextField(blank=True,verbose_name="Description")
    
    class Meta:
        verbose_name="Catégorie"
        verbose_name_plural="Catégories"
        ordering=["name"]
    
    def __str__(self):
        return self.name

    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug=slugify(self.name)
        super().save(*args,**kwargs)

class Tag(models.Model):
    """Tags pour les articles"""
    name = models.CharField(max_length=50, unique=True, verbose_name="Nom")
    slug = models.SlugField(max_length=50, unique=True)
    
    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    


class Article(models.Model):
    """Modèle principal pour les articles de blog"""
    STATUS_CHOICES = [
        ('draft', 'Brouillon'),
        ('published', 'Publié'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="Titre")
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, 
                               related_name='articles', verbose_name="Auteur")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, 
                                 null=True, related_name='articles', 
                                 verbose_name="Catégorie")
    tags = models.ManyToManyField(Tag, related_name='articles', 
                                  blank=True, verbose_name="Tags")
    content = models.TextField(verbose_name="Contenu")
    excerpt = models.TextField(max_length=500, blank=True, 
                               verbose_name="Extrait")
    image = models.ImageField(upload_to='articles/%Y/%m/%d/', 
                             blank=True, null=True, verbose_name="Image")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, 
                             default='draft', verbose_name="Statut")
    views = models.PositiveIntegerField(default=0, verbose_name="Vues")
    created_at = models.DateTimeField(auto_now_add=True, 
                                     verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, 
                                     verbose_name="Date de modification")
    published_at = models.DateTimeField(null=True, blank=True, 
                                       verbose_name="Date de publication")
    
    class Meta:
        verbose_name = "Article"
        verbose_name_plural = "Articles"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['status']),
        ]
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.excerpt and self.content:
            self.excerpt = self.content[:200] + '...'
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('blog:article_detail', kwargs={'slug': self.slug})
    
    @property
    def comment_count(self):
        return self.comments.filter(approved=True).count()

