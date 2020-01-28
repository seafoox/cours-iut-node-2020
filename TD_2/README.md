# Récapitulatif des cours, semaine du 4 Fevrier 2018

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
  "author": "Julien P.",
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

