const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    // question 1
    // lire le contenu du fichier index.html
    // remplacer #contenu# par du text lorem ipsum (ci dessous)
    // Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel mollis nibh, quis varius nisi. Mauris volutpat congue mauris eget tristique. Maecenas ligula quam, ultricies id massa sed, gravida pellentesque quam. Fusce dapibus dignissim velit at efficitur. 
    res.send("<h1>Hello World!</h1>");
});

// question 2
// créer une route /projects qui va:
// - lire le contenu du fichier index.html
// - lire le contenu du fichier projects.json
// - remplacer #contenu# par la listes des titres des projets

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
