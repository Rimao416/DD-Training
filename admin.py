from django.contrib import admin
from .models import Article
from .models import Commentaire
from .models import Categorie

class CommentaireInline(admin.TabularInline):
    model = Commentaire
    extra = 1  # Nombre de formulaires vides
    fields = ('auteur', 'email', 'contenu', 'approuve')
    
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('titre', 'auteur', 'statut', 'vues')
    search_fields=('titre','contenu')
    list_editable=('statut',)
    prepopulated_fields={'slug':('titre',)}
    inlines=[CommentaireInline]





admin.site.register(Article,ArticleAdmin)
admin.site.register(Categorie)
admin.site.register(Commentaire)