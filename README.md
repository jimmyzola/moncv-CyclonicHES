#Projet de création d'une page web CV
##outils

* gulp
* git
* chrome
* chrome devlopper's tools
* Sublime Text 2

##tapes pour la réalisation du cv

lancer la commande yo webapp avec la commande :
```sh
yo webapp
```

Enlever l'option Sass puis continer si on veux utiliser du CSS et non pas du SCSS.

Ensuite, choisir l'option BDD (il serait possible de choisir l'autre car on ne se servira pas de ces fonctionnalités.

Yoeman va créer tous les fichiers nécessaires pour la création d'une appliction web.

On test le bon fonctionnement de l'appliction web crée :

```sh
gulp serve
```

Une fois que l'application créer, il créer le repository git  et le remplir avec les commandes :

```sh
git init
git add .
git commit -m <message>
git remote add origin https://github.com/heg-web/moncv-CyclonicHES.git
git push --set-upstream origin master
```

On procède ensuite à la mise en exploitation du site on build donc le projet et on lance le serveur avec le test:

```sh
gulp build
gulp serve:dist
```

Lorsque le porjet est fonctionnel et correspond à nos attente on peut le mettre en production. On crée donc pour cela une nouvelle branche "gh-pages" sur le github qui nous servira d'hébergeur. Dans cette nouvelle branche, on n'aura uniquement les fichiers utiles à la production, elle ne contiendra donc pas les même fichiers que la branche master.

```sh
git init
git checkout -b gh-pages
git add .
git commit -m <message>
git remote add origin https://github.com/heg-web/moncv-CyclonicHES.git
git push --set-upstream origin gh-pages
```

On procède ensuite à l'installation du plugin permettant le déploiement automatique

```sh
npm install --save-dev gulp-deploy-git
```

Une fois le plugin installé, on procède à sa configuration dans le gichier ./gulpfile.js

```javascript
var deploy = require('gulp-deploy-git');
gulp.task('deploy', function() {
  return gulp.src('**/*',  { read: false, cwd: 'dist'  })
    .pipe(deploy({
      repository: 'https://github.com/heg-web/moncv-CyclonicHES.git',
      remoteBranch:   'gh-pages'
    }))
});
```

Une fois ceci fait, poour mettre en exploitation la nouvelle version du projet, il n'y aura plus qu'a faire : 

```sh
gulp built
gulp deploy
```

Pour chaque ajout de fonctionnalité ou correction de bug, il coonvient de créer une nouvelle branche dans git, de travailler dessus et de la merge avec la branche master une fois que tout à été terminé, testé et qu'on est arrivé à une version stable. A chaque fois il faudra faire les commandes suivantes. (Désormais je ne répèterais plus ce point et il sera implicite à tout ajoute de fonctionnelité, etc...)

```sh
git branch <nom-de-la-nouvelle-branche>
git checkout <nom-de-la-nouvelle-branche>
"travailler et faire les commit nécessaire"
git add .
git commit -m <message>
git checkout master
git merge <nom-de-la-nouvelle-branche>
git push
```

Nous allons maintenant ajouter le plugin bootswatch. Pour cela, il faut tapper la commande suivante dans la commande node.js

```sh 
bower install bootswatch --save
```

Après son installation, on peut ajouter la ligne suivante entre les bases de build bower

```html
<!-- endbower -->
<link rel="stylesheet" href="bower_components/bootswatch/flatly/bootstrap.css" />
<!-- endbuild -->
```

Le prochain plugin à installer est jquery-smooth-scroll qui permet d'addoucire le défillement quand on clique sur un lien qui pointe sur une ancre.

```sh
bower install jquery-smooth-scroll --save
```

Pour que le plugin soit utilisé, on doit modifier le fichier ./app/scripts/main.js et y ajouter :

```javascript
$(document).ready(function(){
  'use strict';
  $('a').smoothScroll();
});
```

Il faut également ajouter une ancre sur la page. Nous allons l'ajouter sur le lient "About" en changant le code suivant :

```html
<li><a href="#">About</a></li>
<div class="row marketing">
```

en : 

```html
<li><a href="#about">About</a></li>
<div class="row marketing" id="about">
```


Ensuite, j'ai adapté le style de la page selon mes besoins en me référant à la documentation de bootstrap disponible [ici](http://getbootstrap.com/).

Je me suis servit de plusieurs éléments tel que : 
* la navbar
* la mise en page par colonne
* le Jumbotron
* les progress bars
* le footer

Une fois toutes les modifications effectuées, j'ai remis le site mis à jour en exploitation.

