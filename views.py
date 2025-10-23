from django.shortcuts import render
from datetime import datetime

def dire_bonjour(request):
   
    personnes = [
        {'nom': "Omari", 'age': 26, 'ville': 'Tunisie'},
        {'nom': "Alassane", 'age': 45, 'ville': 'Côte d’Ivoire'},
        {'nom': "HP", 'age': 36, 'ville': 'Mali'},
        {'nom': "Author", 'age': 33, 'ville': 'Togo'},
        {'nom': "Franck", 'age': 80, 'ville': 'Somalie'},
    ]
    contexte={
        'personnes':personnes
    }
    return render(request, 'hello/bonjour.html',contexte)
