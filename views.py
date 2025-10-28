from django.shortcuts import render
from datetime import datetime

def accueil(request):
    contexte = {
        'titre': 'Bienvenue sur notre agence',
        'date': datetime.now()
    }
    return render(request, 'vitrine/accueil.html', contexte)

def apropos(request):
    contexte = {
        'titre': 'À propos de nous',
        'description': 'Nous sommes une agence créative basée en Tunisie.',
        'annee_creation': 2020
    }
    return render(request, 'vitrine/apropos.html', contexte)

def services(request):
    services_list = [
        {'nom': 'Développement Web', 'prix': '5000 TND'},
        {'nom': 'Design UI/UX', 'prix': '3000 TND'},
        {'nom': 'Marketing Digital', 'prix': '2000 TND'},
    ]
    contexte = {
        'titre': 'Nos services',
        'services': services_list
    }
    return render(request, 'vitrine/services.html', contexte)

def contact(request):
    contexte = {
        'titre': 'Nous contacter',
        'email': 'contact@agence.tn',
        'phone': '+216 25 123 456'
    }
    return render(request, 'vitrine/contact.html', contexte)

def blog(request):
    articles = [
        {'id': 1, 'titre': 'Les tendances web 2024', 'auteur': 'Alice', 'date': '2024-01-15'},
        {'id': 2, 'titre': 'Django pour débutants', 'auteur': 'Bob', 'date': '2024-02-20'},
        {'id': 3, 'titre': 'UX Design en 2024', 'auteur': 'Charlie', 'date': '2024-03-10'},
    ]
    contexte = {
        'titre': 'Notre Blog',
        'articles': articles
    }
    return render(request, 'vitrine/blog.html', contexte)

def article_detail(request, id):
    
    articles = {
        1: {'titre': 'Les tendances web 2024', 'contenu': 'Lorem ipsum...'},
        2: {'titre': 'Django pour débutants', 'contenu': 'Lorem ipsum...'},
        3: {'titre': 'UX Design en 2024', 'contenu': 'Lorem ipsum...'},
    }

    article = articles.get(id, {'titre': 'Non trouvé', 'contenu': 'Cet article n\'existe pas'})

    contexte = {
        'titre': article['titre'],
        'contenu': article['contenu']
    }
    return render(request, 'vitrine/article_detail.html', contexte)
