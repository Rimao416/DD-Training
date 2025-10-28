from django.db import models
from django.contrib.auth.models import User
class Categorie(models.Model):
    nom=models.CharField(max_length=100,unique=True)
    description=models.TextField(blank=True)

    def __str__(self):
        return self.nom
    
    class Meta:
        verbose_name="Catégorie"
        verbose_name_plural="Catégories"


class Article(models.Model):
    STATUT_CHOICES=[
        ('brouillon','Brouillon'),
        ('publie','Publié'),
        ('archive','Archivé'),
    ]
    
    titre=models.CharField(max_length=200,verbose_name="Titre")
    slug=models.SlugField(unique=True)
    contenu=models.TextField()
    extrait=models.TextField(max_length=300,blank=True)
    auteur=models.ForeignKey(User,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.titre
    