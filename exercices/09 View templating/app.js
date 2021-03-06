const express = require('express');
const defaultRoutes = require('./routes/default');
const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const loginRoutes = require('./routes/login');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Ajout declaration moteur de template
app.set('view engine', 'pug');

app.use('/', defaultRoutes);
app.use('/projects', projectsRoutes);
app.use('/contact', contactRoutes);
app.use('/login', loginRoutes);

app.listen(3000, () => {
  console.log('Server started');
});
