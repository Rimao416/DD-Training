"""
Script pour peupler la base de données avec des données de test
Usage: python manage.py shell < populate_db.py
"""

from django.contrib.auth.models import User
from blog.models import Category, Tag, Article, Comment, Contact
from django.utils import timezone
from datetime import timedelta
import random

print("Début du peuplement de la base de données...")

# Nettoyer les données existantes (optionnel)
# Article.objects.all().delete()
# Category.objects.all().delete()
# Tag.objects.all().delete()
# User.objects.filter(is_superuser=False).delete()

# =====================================
# 1. CRÉER DES UTILISATEURS
# =====================================
print("\n👥 Création des utilisateurs...")

users_data = [
    {"username": "alice_dev", "email": "alice@bloghub.com", "first_name": "Alice", "last_name": "Martin"},
    {"username": "bob_writer", "email": "bob@bloghub.com", "first_name": "Bob", "last_name": "Dupont"},
    {"username": "charlie_tech", "email": "charlie@bloghub.com", "first_name": "Charlie", "last_name": "Bernard"},
    {"username": "diana_travel", "email": "diana@bloghub.com", "first_name": "Diana", "last_name": "Rousseau"},
]

users = []
for user_data in users_data:
    user, created = User.objects.get_or_create(
        username=user_data["username"],
        defaults={
            "email": user_data["email"],
            "first_name": user_data["first_name"],
            "last_name": user_data["last_name"]
        }
    )
    if created:
        user.set_password("password123")
        user.save()
        print(f"Utilisateur créé : {user.username}")
    else:
        print(f"Utilisateur existant : {user.username}")
    users.append(user)

# =====================================
# 2. CRÉER DES CATÉGORIES
# =====================================
print("\n📁 Création des catégories...")

categories_data = [
    {"name": "Technologie", "description": "Articles sur les nouvelles technologies, programmation et innovations"},
    {"name": "Voyages", "description": "Récits de voyages, destinations et conseils pour voyageurs"},
    {"name": "Cuisine", "description": "Recettes, astuces culinaires et gastronomie"},
    {"name": "Sport", "description": "Actualités sportives, conseils fitness et nutrition"},
    {"name": "Culture", "description": "Art, cinéma, musique et événements culturels"},
    {"name": "Science", "description": "Découvertes scientifiques et vulgarisation"},
]

categories = []
for cat_data in categories_data:
    category, created = Category.objects.get_or_create(
        name=cat_data["name"],
        defaults={"description": cat_data["description"]}
    )
    if created:
        print(f"Catégorie créée : {category.name}")
    else:
        print(f"Catégorie existante : {category.name}")
    categories.append(category)

# =====================================
# 3. CRÉER DES TAGS
# =====================================
print("\n Création des tags...")

tags_names = [
    "Python", "Django", "Web", "API", "Tutorial",
    "Débutant", "Avancé", "Europe", "Asie", "Afrique",
    "Recette", "Végétarien", "Football", "Basketball",
    "Cinéma", "Musique", "Biologie", "Physique"
]

tags = []
for tag_name in tags_names:
    tag, created = Tag.objects.get_or_create(name=tag_name)
    if created:
        print(f" Tag créé : {tag.name}")
    tags.append(tag)

# =====================================
# 4. CRÉER DES ARTICLES
# =====================================
print("\n Création des articles...")

articles_data = [
    {
        "title": "Introduction à Django pour débutants",
        "category": "Technologie",
        "tags": ["Python", "Django", "Tutorial", "Débutant"],
        "content": """Django est un framework web Python puissant et élégant qui permet de créer des applications web robustes rapidement. 

Dans ce tutoriel, nous allons explorer les bases de Django et créer notre première application web.

## Installation

Pour commencer, installez Django avec pip :
```
pip install django
```

## Créer un projet

Créez votre premier projet Django :
```
django-admin startproject monprojet
```

## Architecture MVT

Django utilise le pattern MVT (Model-View-Template) qui sépare la logique métier de la présentation.

Avec Django, vous pouvez construire des applications complexes en quelques heures seulement !""",
        "views": random.randint(50, 500)
    },
    {
        "title": "Les meilleures destinations en Europe en 2024",
        "category": "Voyages",
        "tags": ["Europe", "Voyages"],
        "content": """L'Europe regorge de destinations magnifiques à découvrir. Voici notre sélection pour 2024.

## 1. Lisbonne, Portugal

La capitale portugaise offre un mélange parfait d'histoire et de modernité. Ses ruelles pavées, ses tramways jaunes et sa gastronomie en font une destination incontournable.

## 2. Budapest, Hongrie

Surnommée la "Perle du Danube", Budapest séduit par ses bains thermaux, son architecture grandiose et sa vie nocturne animée.

## 3. Dubrovnik, Croatie

Cette ville fortifiée sur l'Adriatique est un joyau de la Méditerranée, célèbre pour ses remparts médiévaux et ses eaux cristallines.

Planifiez votre voyage dès maintenant et découvrez ces merveilles européennes !""",
        "views": random.randint(100, 600)
    },
    {
        "title": "Recette : Risotto aux champignons",
        "category": "Cuisine",
        "tags": ["Recette", "Végétarien"],
        "content": """Un délicieux risotto crémeux aux champignons, parfait pour un dîner raffiné.

## Ingrédients (4 personnes)

- 300g de riz arborio
- 400g de champignons variés
- 1 oignon
- 100ml de vin blanc
- 1L de bouillon de légumes
- 50g de parmesan
- Beurre et huile d'olive

## Préparation

1. Faites revenir l'oignon émincé dans un mélange beurre/huile
2. Ajoutez le riz et nacrez-le pendant 2 minutes
3. Versez le vin blanc et laissez évaporer
4. Ajoutez le bouillon louche par louche en remuant constamment
5. Incorporez les champignons poêlés et le parmesan

Servez immédiatement et régalez-vous !""",
        "views": random.randint(80, 400)
    },
    {
        "title": "Guide complet du développement d'API REST avec Django",
        "category": "Technologie",
        "tags": ["Python", "Django", "API", "Avancé"],
        "content": """Créer une API REST robuste avec Django REST Framework est plus simple qu'il n'y paraît.

## Installation de DRF

```bash
pip install djangorestframework
```

## Créer un serializer

Les serializers convertissent les modèles Django en JSON :

```python
from rest_framework import serializers

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
```

## ViewSets

Les ViewSets regroupent la logique CRUD :

```python
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
```

Avec ces outils, vous pouvez créer des API professionnelles rapidement !""",
        "views": random.randint(200, 800)
    },
    {
        "title": "Les bienfaits du sport sur la santé mentale",
        "category": "Sport",
        "tags": ["Sport"],
        "content": """Le sport n'est pas seulement bon pour le corps, il améliore également considérablement la santé mentale.

## Réduction du stress

L'exercice physique libère des endorphines, les hormones du bonheur, qui aident à combattre le stress et l'anxiété.

## Amélioration de la confiance

Atteindre des objectifs sportifs renforce l'estime de soi et la confiance en ses capacités.

## Meilleur sommeil

Une activité physique régulière améliore la qualité du sommeil, essentielle pour la santé mentale.

N'attendez plus, bougez pour votre bien-être mental !""",
        "views": random.randint(150, 500)
    },
]

articles = []
for i, article_data in enumerate(articles_data):
    # Trouver la catégorie
    category = Category.objects.get(name=article_data["category"])
    
    # Choisir un auteur aléatoire
    author = random.choice(users)
    
    # Créer l'article
    article, created = Article.objects.get_or_create(
        title=article_data["title"],
        defaults={
            "author": author,
            "category": category,
            "content": article_data["content"],
            "status": "published",
            "views": article_data["views"],
            "published_at": timezone.now() - timedelta(days=random.randint(1, 30))
        }
    )
    
    if created:
        # Ajouter les tags
        for tag_name in article_data["tags"]:
            tag = Tag.objects.get(name=tag_name)
            article.tags.add(tag)
        
        print(f" Article créé : {article.title}")
    else:
        print(f" Article existant : {article.title}")
    
    articles.append(article)

# =====================================
# 5. CRÉER DES COMMENTAIRES
# =====================================
print("\n Création des commentaires...")

comments_texts = [
    "Excellent article ! Très instructif.",
    "Merci pour ce partage, ça m'a beaucoup aidé.",
    "Super contenu, j'attends la suite avec impatience !",
    "Très bien expliqué, même pour un débutant comme moi.",
    "Article intéressant, mais j'aurais aimé plus de détails sur certains points.",
    "Génial ! Je vais essayer ça dès ce weekend.",
    "Merci pour ces conseils pratiques !",
    "Contenu de qualité, comme d'habitude !",
]

for article in articles:
    # Créer entre 2 et 5 commentaires par article
    num_comments = random.randint(2, 5)
    for _ in range(num_comments):
        commenter = random.choice(users)
        content = random.choice(comments_texts)
        
        Comment.objects.create(
            article=article,
            author=commenter,
            content=content,
            approved=True
        )
    
    print(f" {num_comments} commentaires ajoutés à : {article.title[:50]}...")

# =====================================
# 6. CRÉER DES MESSAGES DE CONTACT
# =====================================
print("\n Création des messages de contact...")

contacts_data = [
    {
        "name": "Sophie Lambert",
        "email": "sophie.lambert@email.com",
        "subject": "Question sur un article",
        "message": "Bonjour, j'ai une question concernant votre article sur Django. Pourriez-vous me contacter ?"
    },
    {
        "name": "Marc Dubois",
        "email": "marc.dubois@email.com",
        "subject": "Proposition de collaboration",
        "message": "Bonjour, je suis intéressé par une collaboration pour écrire des articles. Êtes-vous disponible pour en discuter ?"
    },
    {
        "name": "Émilie Petit",
        "email": "emilie.petit@email.com",
        "subject": "Erreur sur un article",
        "message": "Bonjour, j'ai remarqué une petite erreur dans votre article sur les APIs REST. Voulez-vous que je vous la signale ?"
    },
]

for contact_data in contacts_data:
    Contact.objects.create(**contact_data)
    print(f"Message de contact créé : {contact_data['subject']}")

# =====================================
# RÉSUMÉ
# =====================================
print("\n" + "="*50)
print("✨ Base de données peuplée avec succès ! ✨")
print("="*50)
print(f"\n Résumé :")
print(f"   Utilisateurs : {User.objects.count()}")
print(f"   Catégories : {Category.objects.count()}")
print(f"   Tags : {Tag.objects.count()}")
print(f"   Articles : {Article.objects.count()}")
print(f"   Commentaires : {Comment.objects.count()}")
print(f"   Messages de contact : {Contact.objects.count()}")
print("\n Vous pouvez maintenant tester l'application !")
print("   URL: http://127.0.0.1:8000")
print("\n👤 Identifiants de test :")
print("   Username: alice_dev (ou bob_writer, charlie_tech, diana_travel)")
print("   Password: password123")