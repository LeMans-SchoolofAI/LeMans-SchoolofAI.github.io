# Site web de Le Mans School of AI

## Pour contribuer à l'agenda, contacter les organisateurs ou proposez un pull request.

## Pour ajouter,supprimer ou modifier un événement vous devez vous rendre dans le fichier "events.json". Vous n'avez pas à vous occuper de l'ordre des évenements de la liste par rapport aux dates, l'évenement s'intégrera automatiquement. Voici un exemple: 
<pre>
{
    "title": "Introduction à l'IA",
    "date": "2025-09-11",
    "organizers": ["Gaëtan", "Mustafa"],
    "registration": "https://www.meetup.com/le-mans-school-of-ai/events/307193854/",
    "comment": "Ceci est un commentaire"
}
</pre>

- "titre" : Titre obligatoire
- "date" : ormat date : année-mois-jour ; Si pas de date mettre "null" et ira automatiquement dans Idées / non planifié
- "organizers" : Si pas d'organisateur défini supprimer la ligne
- "registration" : Si pas de lien d'inscription supprimer la ligne 
- "comment" : Si pas de commentaire supplémentaire supprimer cette ligne <== dernier élément de l'événement pas de virgule.

**Important:** Si votre évènement comporte des organisateurs, vérifiez le lien linkedin des organisateurs en question dans la liste en haut du fichier "events.json". Vous pouvez également ajouter des organisateurs avec leur lien linkdedin dans cette liste.


