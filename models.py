from django.db import models

class Categorie(models.Model):
    nom=models.CharField(max_length=100,unique=True)
    description=models.TextField(blank=True)

    def __str__(self):
        return self.nom
    
    class Meta:
        verbose_name="Catégorie"
        verbose_name_plural="Catégories"

class Auteur(models.Model):
    nom=models.CharField(max_length=100)
    email=models.EmailField()

class Article(models.Model):
    titre=models.CharField(max_length=200)
    contenu=models.TextField()
    auteur=models.ForeignKey(Auteur,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.titre
    