const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const defaultRoutes = require('./routes/default.js');
const projectsRoutes = require('./routes/projects.js');

// Route vers les ressources static
app.use(express.static('public'));

// Routes par defaut
app.use('/', defaultRoutes);

// Routes pour /projects
app.use('/projects', projectsRoutes);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});