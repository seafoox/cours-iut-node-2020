const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const defaultRoutes = require('./routes/default.js');
const projectsRoutes = require('./routes/projects.js');
const contactRoutes = require('./routes/contact.js');

app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', defaultRoutes);
app.use('/projects', projectsRoutes);
app.use('/contact', contactRoutes);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});