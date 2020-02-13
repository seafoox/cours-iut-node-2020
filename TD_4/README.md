# Récapitulatif des cours, semaine du 14 Février 2020

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

### Authentification par token

L'authentification par token est de plus en plus populaire, notamment de part l'émergence des
apps frontend (JS client), des apps mobiles et des APIs. Les cookies sont moins simples à
utiliser dans le cas où on peut avoir différents types de clients (pas uniquement des
navigateurs) et quand on expose une API à des services tiers.
Les étapes d'utilisation sont les suivantes :
1. L'utilisateur entre ses informations de login
1. Le serveur vérifie que les informations sont correctes et retourne un **token signé**
1. Le token est stocké côté client, souvent dans le [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
1. Toutes les requêtes suivantes envoyées au serveur incluent le token dans un
header HTTP `Authorization`
1. Le serveur décode le token et si celui-ci est valide, il considère que l'utilisateur
est authentifié
1. Lorsque l'utilisateur se déconnecte, le token est supprimé côté client et le serveur n'a rien
à faire et n'a même pas besoin d'être contacté

### Différence entre les 2

La principale différence entre l'authentification par cookie et par token est la notion
de **state**.
- L'authentification par cookie est **stateful** ("_avec état_")
  - Le serveur doit garder la session en mémoire, il garde donc un état de "qui est connecté"
  - Utilisation des headers `Set-Cookie` (serveur → client) et `Cookie` (client → serveur)
- L'authentification par token est **stateless** ("_sans état_")
  - Le serveur n'a pas besoin de garder la liste des connectés : il se contente de créer et envoyer
  des tokens et de les valider quand il reçoit des requêtes
  - Utilisation du header `Authorization` (client → serveur)

Ci-dessous, un schéma qui résume le process pour chacun et les différences

![cookie vs token auth](cookie-token-auth.png)

### Pour aller plus loin

Cette partie est fortement inspirée de l'excellent article [Cookies vs Tokens: The Definitive Guide](https://auth0.com/blog/cookies-vs-tokens-definitive-guide/)

### Utilisation détournée des cookies

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

## 10 Authentification: Authentification par cookies avec Express

### Utilisation d'un middleware

Il y a plusieurs façon de manipuler les cookies avec Node, mais pour notre example
nous allons utiliser le package `express-session` comme middleware avec Express.

Installer le package
```sh
npm install express-session --save
```

Configurer et appeler le middleware
```javascript
const express = require('express');
const app = express();
const expressSession = require('express-session');

const expressSessionParams = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  maxAge: 24 * 60 * 60 * 1000, // 24 heures
};
app.use(expressSession(expressSessionParams));
```
→ Maintenant, pour toutes les requêtes reçues par notre application Express, on aura une
vérification de la présence de cookie. De plus, on a maintenant accès à `req.session`
dans les routes.

### Ajouter des données dans le cookie

On initialisera souvent les données d'un cookie après un login réussi :

```javascript
router.post('/login', (req, res) => {
  const form = req.body;
  const userFound = verifyUser(form.username, form.password); // exemple de fonction à coder

  // Si userFound !== null, on le sauvegarde dans la session à l'aide d'un cookie
  if (userFound) {
    req.session.userId = userFound.id;
    req.session.username = userFound.username;
    resultMessage = `Vous êtes connecté en temps que ${userFound.username}`;
  }
  else {
    resultMessage = 'L\'identifiant ou le mot de pass sont incorrects';
  }
  res.render('login', { info: resultMessage });
});
```

### Vérification du statut de connexion à l'initialisation

Si on veut récupérer les données de la session (du cookie), on peut le faire dans un middleware
qu'on ajoute _après_ l'initialisation de `express-session` :

```javascript
app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    res.locals.username = req.session.username;
  }
  next();
});
```
(Note : à propos de la présence de `next()`, se référer à la [documentation des middlewares](http://expressjs.com/en/guide/using-middleware.html))

Ici, on utilise `req.session` pour vérifier l'existance d'une connexion utilisateur et pour
récupérer ses données, et on utilise `res.locals` pour initialiser une variable qui sera
disponible dans **toute l'application**, y compris dans les routes et dans les vues.
C'est pratique ici pour pouvoir afficher le nom de l'utilisateur connecté sur toutes les pages
sans avoir à dupliquer le code autant de fois qu'il y a de pages.

### Déconnexion

La déconnexion est très simple : il suffit de _supprimer_ les données de session côté serveur,
et l'utilisateur ne sera plus reconnu pour les requêtes suivantes :

```javascript
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});
```

Note : on utilise ici un `res.redirect` et non un `res.render` *justement* parce qu'on est dans le cas d'une déconnexion. Avec un `render`, on se contenterait d'afficher une page sans que la
"perte" de la session ne soit encore prise en compte. En utilisant un `redirect`, c'est
comme si on relançait une nouvelle requête que le serveur doit éxecuter depuis le début :
il va donc repasser par les middlewares et va ainsi modifier le statut de connexion (modifier
les valeurs de `req.session`, `res.locals`...etc.)

### Pour aller plus loin

[express-session middleware](https://github.com/expressjs/session)
