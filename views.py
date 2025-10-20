from django.shortcuts import render
from datetime import datetime

def dire_bonjour(request):
    contexte = {
        'heure_actuelle': datetime.now().strftime('%H:%M:%S')
    }
    return render(request, 'hello/bonjour.html', contexte)
