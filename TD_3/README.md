# Récapitulatif du cours du 3 Fevrier 2018

## Utilisation d'un moteur de template
Jusqu'à présent nous avons construit notre application web en mélangeant la logique métier écrit en JS avec les vues (= pages) elles-mêmes, écrites en HTML. Cela fonctionne, mais rend difficile la maintenance ainsi que la collaboration. Afin de pallier à ces problèmes, il est une bonne pratique d'utiliser un moteur de template, permettant ainsi de séparer distinctement l’interface graphique du reste de votre application.

### Installation de pug
Pour ce faire nous avons opté pour l'utilisation du moteur `pug` (site officiel)[https://pugjs.org/api/getting-started.html] qui s'installe via npm au même titre que les autres packages via la commande `npm install pug --save`


Il faut maintenant indiquer à expressJS que nous souhaitons utiliser le moteur de template pug.

**app.js**
```js
...
app.set('view engine', 'pug');
...
```
Par défaut express, va maintenant chercher les vues `*.pug` définis dans le dossier `./views/*`.

### Création de notre première vue pug

Il ne reste plus qu'à transformer nos vues `*.html` en vues `*.pug`

*Note: Attention à l'indentation, chaque espace / tabulation manquante ou bien en trop peut générer une erreur ou bien casser l'affichage.*

Par exemple le fichier *index.html*
```html
<html>
  <head>
    <title>Mes projets</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Mes Projets</h1>
      </header>
      <nav>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/projects">Projets</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div class="content">
        #content#
      </div>
      <footer>
        Julien Paroche – 30 Janvier 2018
      </footer>
    </div>
  </body>
</html>

```


devient le fichier **views/index.pug**
```jade
html
  head
    title=myTitle
    link(rel="stylesheet" href="/style.css")
  body
    .container
      header
        h1 Mon site - #{myTitle}
        if username
          span Connecté en tant que #{username}
        else
          span Pas connecté
      nav
        ul
          li
            a(href="/") Accueil
          li
            a(href="/projects") Projets
          li
            a(href="/contact") Contact

      .content
          if content != null
            div #{content}
          else
            div Y a pas de contenu

      footer IUT Paris Descartes - Cours programmation back-end avec Thomas L. et Alexandre C.
```

Côté JavaScript, il nous suffit de donner
```js
res.render('index', {
  content: accueilText,
  myTitle: 'Accueil'
});
```
Ici `index` correspond au nom de ma vue: `views/index.pug`, et l'objet qui suit l'ensemble des variables que l'on veut passer dans la vue.

### Utilisation de variable
La force du moteur de template est de vous laisser passer autant de variables que vous souhaitez et les afficher là où vous le souhaitez.
Il existe plusieurs façons d'afficher la valeur d'une variable

* Nom de la variable uniquement lorsque celle-ci est précédée du nom de la balise HTML suivi de `=`. Par exemple `title=myTitle` ou bien `.content=content` (ici la variable s'appelle content, tout comme le nom que l'on donne à la class associée à la div)
* Entourée de #{maVariable}. C'est certainement la façon la plus répandue, car elle permet d'inclure une variable dans une chaine de caractères. Par exemple: `h1 Mon site - #{myTitle}`
* Sans #{maVariable} lorsque celle-ci est utilisée au sein d'un attribut d'une balise HTML. Exemple: `a(href="/projects/" + project.id) ....` -> `<a href="/projects/1"> ....</a>`

### Aller plus loin grâce à la syntaxe pug
#### Utilisation des IF / ELSE

Extrait de **index.pug**
```jade
.content
  if content != null
    div #{content}
  else
    div Y a pas de contenu
```

#### Autres éléments de syntaxe
Il existe un grand nombre d'autres éléments de syntaxe qui rendent l'écriture des vues simplifiée.
Ces derniers sont décrits ici
* https://naltatis.github.io/jade-syntax-docs/ (CheatSheet)
* https://gist.github.com/joepie91/c0069ab0e0da40cc7b54b8c2203befe1

### Imbrication de plusieurs vues et utilisation d'un layout
Lorsque l'on écrit du code, il est important d’éviter dès que possible toute répétition - c'est le principe de D.R.Y => [Don't Repeat Yourself](https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas). C'est ce que l'on va faire ici en s'appuyant sur la fonctionnalité "d'héritage" offerte par "pug".

Pour cela il nous faut créer une nouvelle vue `*.pug` qui va content la partie commune à chacune des pages, à savoir le header + footer. Par convention nous l'appelons layout.pug

**layout.pug**
```jade
html
  head
    title=myTitle
    link(rel="stylesheet" href="/style.css")
  body
    .container
      header
        h1 Mon site - #{myTitle}
        if username
          span Connecté en tant que #{username}
        else
          span Pas connecté
      nav
        ul
          li
            a(href="/") Accueil
          li
            a(href="/projects") Projets
          li
            a(href="/contact") Contact

      .content
        block dynamicContent

      footer IUT Paris Descartes - Cours programmation back-end avec Thomas L. et Alexandre C.
```

On note ici que l'on ajouter dans la partie `.content` la mention `block dynamicContent`. Ceci nous permet de déclarer la partie qui va être injectée en provenance des pages utilisant ce template.

Une fois cela fait, nous pouvons pour chacune de nos vues imbriquées, retirer la partie déclarée dans le fichier layout.pug (qui est celle répétée)


