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
    categorie = models.ForeignKey(Categorie, on_delete=models.SET_NULL, null=True)
    statut=models.CharField(max_length=20,choices=STATUT_CHOICES)
    vues=models.IntegerField(default=0)
    
    def __str__(self):
        return self.titre
    
class Meta:
    ordering=['date_publication']
    verbose_name="Article"
    verbose_name_plural="Articles"
        

class Commentaire(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='commentaires')
    auteur = models.CharField(max_length=100)
    email = models.EmailField()
    contenu = models.TextField()
    date_creation = models.DateTimeField(auto_now_add=True)
    approuve = models.BooleanField(default=False)

    def __str__(self):
        return f"Commentaire de {self.auteur} sur {self.article.titre}"

    class Meta:
        ordering = ['-date_creation']
    