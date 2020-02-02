# Récapitulatif des cours, semaine du 26 Janvier 2020

## NPM et package.json

### Utilisation du fichier package.json

Ce fichier est la description d'un projet Javascript, aussi bien en frontend qu'en backend.
Il permet à n'importe qui d'utiliser et développer un projet car il contient :
- Les dépendances pour le projet (_dependencies_) et pour le développement (_devDependencies_)
- Les commandes à utiliser pour faire tourner le projet (_scripts_)
- Des infos importantes sur le projet comme l'auteur, le repository où il est hébèrgé, la version...etc

Voici un exemple simple d'un fichier `package.json` :
```json
{
  "name": "express_app",
  "version": "1.0.0",
  "description": "My new Express app",
  "main": "app.js",
  "scripts": {
    "start": "\"./node_modules/.bin/nodemon\" app.js",
    "regular_start": "node app.js"
  },
  "author": "Me",
  "license": "MIT",
  "dependencies": {
    "express": "^4.16.2"
  },
  "devDependencies": {
    "nodemon": "^1.14.12"
  }
}
```

Pour éxecuter les _scripts_, vous pouvez taper :
- `npm start` → `start` est une commande standard
- `npm run regular_start` → il faut ajouter `run` pour les commandes custom

### NPM : gestion des dépendances

Les dépendances installées (téléchargées) avec `npm` seront toujours situées dans le dossier `node_modules` qui se trouvera au même endroit que le fichier `package.json`.

Il y a 4 façons d'installer des dépendances :

1. Installer tous les packages déclarés dans _dependencies_ et _devDependencies_ du `package.json`
```sh
npm install
```

2. Installer une dépendance sans l'enregistrer (télécharge simplement dans `node_modules/`)
```sh
npm install express
```

3. Installer une dépendance de l'app, et l'enregistrer dans les _dependencies_ du `package.json`
```sh
npm install express --save
```

4. Installer une dépendance de l'app, et l'enregistrer dans les _devDependencies_ du `package.json`
```sh
npm install express --save-dev
```

### Utilisation de dépendances

En Node, les dépendances s'utilisent avec `require`.

Il y a 2 types de dépendances qui peuvent être appelées avec `require`:

#### 1. Les dépendances Node, qui se trouvent dans la partie `dependencies` du fichier `package.json`

```sh
npm install express
```

```javascript
// Un nom "seul" sera cherché dans le dossier node_modules/
const express = require('express');
```

#### 2. Les objets ou fonctions que l'on a nous-même définis en tant que dépendances avec `module.exports`
```javascript
function monModule(param) {
  return param + '-modified';
}
module.exports = monModule;
// --- OU ---
const monModule = {
    property1: true,
    property2: 'string value',
};
module.exports = monModule;
```

```javascript
// Il faut viser le fichier relativement à celui où l'on se trouve avec ./ ou ../
const module = require('./monModule');
// --- OU ---
const module = require('./monModule.js');
```

## Premiers pas avec Express

### Express est un framework

Un **framework** est un ensemble d'outils, de composants, de méthodes et de bonnes pratiques.
Cela permet de :
- Créer rapidement les fondations d'un projet et démarrer à coder les "véritables"
fonctionnalités plus vite
- Donner un cadre et une organisation du code (_architecture_) que le développeur n'a pas à
concevoir lui-même

Quelques éléments importants fournis par le framework Express:
- La gestion des routes (le _routing_), avec les objets `req` et `res`
- La gestion des moteurs de template (_Pug_)
- Les middlewares
- La création de routes API et REST-friendly

### Gestion des routes

La gestion des routes est simple mais très pratique avec Express. On peut définir des routes
directement depuis l'`app` ou bien en passant par le `Router` pour créer des structures plus
avancées et composées :

1. Routes simples
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const html = getAccueil();
    res.send(html);
});

app.get('/projects', (req, res) => {
    const html = getListeProjets();
    res.send(html);
});
```

2. Routes avancées : modulaires
Se référer à "07 Express first app - Modules"

```javascript
// routes/default.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const html = getAccueil();
    res.send(html);
});

module.exports = router;
```

```javascript
// routes/projects.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const html = getListeProjets();
    res.send(html);
})

module.exports = router;
```

```javascript
const app = express();

const defaultRoutes = require('./routes/default.js');
const projectsRoutes = require('./routes/projects.js');

app.use('/', defaultRoutes);
app.use('/projects', projectsRoutes);
```

Pour aller plus loin : [Express routing](https://expressjs.com/fr/guide/routing.html)

#### Passage de paramètres dans les routes
Se référer à l'exercice "07 Express first app - Modules"

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```
Pour définir cette route, il suffit de specifier les paramètres dans le chemin de la route, comme indiqué ci-dessous

```javascript
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})
```
Note: les valeurs passées en paramètre doivent correspondre à une chaine de caractères ([A-Za-z0-9_]).

[Exemple complémentaire dans la doc Express (EN)](https://expressjs.com/en/guide/routing.html)

### Formulaire et envoi de donnée en POST
Lorsqu'il est nécessaire d'envoyer des données à un serveur, notamment dans le cas d'un formulaire (d'inscription, login, contact ...), il est préférable pour des raisons de performance et de sécurité, d'utiliser la méthode POST. Ceci permet que les données envoyées le soient dans le corps de la requête HTTP (= body), et non dans l'URL directement.

#### 08 Express first app - Forms
```html
# routes/contact.js
<form action="/contact/send" method="post">
    <label for="message">Votre message: </label>
    <textarea id="message" type="text" name="message_field" value="Saisir votre messsage"></textarea>
    <input type="submit" value="Envoyer">
</form>
```

Lorsque l'utilisateur clique sur "Envoyer", le contenu qu'il aura saisi dans le champ `#message` sera envoyé vers le serveur

* Vers la route `/contact/send` utilisant la méthode `POST`
* Le contenu du body sera alors `message_field:Le texte que j'ai saisi`

A noter qu'il est aussi bien possible de passer des données texte (texte non structuré provenant de formulaire, JSON, ...), que binaire (upload damage, pdf, ...)

```javascript
// routes/contact.js
router.post('/send', (req, res) => {
    let params = req.body;
    console.log(params);
    res.redirect('/contact?status=sent');
});
```
Afin de lire les informations reçues, il nous faut utiliser le middleware [body-parser](https://github.com/expressjs/body-parser) installé via `npm` et initialisé dans `app.js` à l'aide des lignes suivantes:

```javascript
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
```

À noter qu'ici nous ne faisons aucun usage des informations envoyées au-delà de les afficher dans la console, mais qu'en temps normal en fonction de l'usage il est courant de sauvegarder les données reçues dans un BD, et si besoin faire d'autres actions comme envoyer un email (dans le cas d'un formulaire de contact).


#### Informer l'utilisateur que le formulaire est bien envoyé
Une fois les données du formulaire reçu par le serveur, il nous suffit de prévenir l'utilisateur que l'envoie du formulaire bien fonctionné.
Pour ce faire, il nous suffit de le rédiger vers la même page, et d'y afficher un message de confirmation qui se base sur la condition que `?status=sent` fait partie des paramètres d'URL passés (on regarde la valeur de `req.query.status`). Ce qui est le cas ici lors de notre redirection.

```javascript
// routes/contact.js
router.get('/', (req, res) => {
    let html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
    let form;
    if (req.query.status) {
        form = 'Message envoyé';
    } else {
        form = `
            <form action="/contact/send" method="post">
                <label for="message">Votre message: </label>
                <textarea id="message" type="text" name="message_field" value="Saisir votre messsage"></textarea>
                <input type="submit" value="Envoyer">
            </form>
        `;
    }
    html = html.replace('#content#', form);
    res.send(html);
});
```

### Middlewares

Les middlewares sont des fonctions qui sont appelées par Express entre l'éxecution de
2 modules, généralement après l'initialisation de l'app et avant de définir et
éxecuter les routes :

```javascript
const express = require('express');
const app = express(); // initialisation de l'app

// middleware qui permet de decoder le 'body' envoyé depuis un formulaire
app.use(express.urlencoded({ extended:true }));

// définition d'une route, dans laquelle on bénéficiera des "résultats" du middleare
app.get('/', (req, res) => {
    cont form = req.body;
    res.send('Contenu de mon formulaire: ' + JSON.stringify(form));
});
```

On peut schématiser l'action d'un middleware comme suis :

![Express middleware cascade](express_middleware_cascade.png)

Pour aller plus loin :
- [Ecriture de middleware](http://expressjs.com/fr/guide/writing-middleware.html)
- [Using middleware](http://expressjs.com/fr/guide/using-middleware.html)
- [Liste de middlewares](http://expressjs.com/fr/resources/middleware.html)


### Création de routes API et REST-friendly

Le [TD 6](../TD_6/README.md) revient plus en détails sur le concept de d'API REST.

Il faut retenir qu'Express permet très facilement de créer des routes qui correspondent
aux différentes méthodes du protocol HTTP : _GET_, _POST_, _DELETE_, _PUT_...

Exemples :
```javascript
app.get('/route', (req, res) => {
    // cette route ne peut qu'être appelée en utilisant la méthode GET
});
app.post('/route', (req, res) => {
    // cette route ne peut qu'être appelée en utilisant la méthode POST
});
app.delete('/route', (req, res) => {
    // cette route ne peut qu'être appelée en utilisant la méthode DELETE
});
app.put('/route', (req, res) => {
    // cette route ne peut qu'être appelée en utilisant la méthode PUT
});
```

Pour aller plus loin : [Express routing](https://expressjs.com/fr/guide/routing.html)

