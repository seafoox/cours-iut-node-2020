# Récapitulatif des cours, semaine du 13 Février 2018

## 2 types d'authentifications

Il existe différents types d'authentification, dont 2 principaux :
- cookies
- tokens

### Authentification par cookie

L'authentification par cookie est la plus traditionnelle et la plus utilisée par les sites internet
classiques.
Les étapes d'utilisation sont les suivantes :
1. L'utilisateur entre ses informations de login (nom d'utilisateur / mot de passe)
1. Le serveur vérifie que les informations sont correctes et créer une **session** qui est stockée
dans un fichier ou une base de données
1. Un cookie avec l'ID de la session est envoyé et stocké dans le navigateur de l'utilisateur
1. Pour toutes les requêtes suivantes, l'ID de session est envoyé avec toutes les requêtes
de l'utilisateur et vérifié par le serveur
1. Lorsque l'utilisateur se déconnecte, la session est détruite des 2 côtés

## Utilisation détournée des cookies

Les cookies peuvent parfois être détournés et utilisés à d'autres fins que pour l'authentification.
Ce n'est pas important dans le cadre de notre cours, mais simplement bon à garder en tête :
Puisque le cookie est lié à un domaine et qu'il sera automatiquement attaché à toute requête
envoyée au domaine pour lequel il a été créé, cela peut permettre à un site de "suivre" votre
navigation internet indirectement.
La méthode utilisée par exemple par Facebook est la suivante :
- Je me connecte à Facebook facebook.com/login
- Facebook créer un cookie pour le domaine facebook.com avec mon identifiant utilisateur
- Quand je visite d'autres sites internet par la suite, plusieurs ont un bouton "J'aime"
fourni par Facebook
- Puisque ce bouton est fourni par Facebook, mon navigateur envoie une requête sur Facebook,
par exemple facebook.com/getLikeButton, pour récupérer l'image et le code HTML du bouton
- Vu que j'étais connecté à Facebook auparavant et que mon navigateur a dû envoyer une requête sur
ce domaine, il a également envoyé le cookie avec mon identifiant de session = Facebook sait que
j'ai visité ce site et cette page web où se trouve le bouton "J'aime", même si je n'ai pas cliqué
dessus.
