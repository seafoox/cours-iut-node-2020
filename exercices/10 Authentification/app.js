const express = require('express');
const session = require('express-session');
const defaultRoutes = require('./routes/default');
const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const loginRoutes = require('./routes/login');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Initialisaiton du moteur de template PUG
app.set('view engine', 'pug');

// Initialialisaiton & Configuration de la session via Cookie
const sessionParams = {
  secret: 'my_secret',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
};
app.use(session(sessionParams));

// Pour chaque nouvelle requette reçu, on regarde si une session
// exist et contient userId. Si c'est le cas, alors recupère de cette
// derniere le username, et on l'ajoute aux variable globales de vue.
app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    res.locals.username = req.session.username;
  }
  next();
});


app.use('/', defaultRoutes);
app.use('/projects', projectsRoutes);
app.use('/contact', contactRoutes);
app.use('/login', loginRoutes);

app.listen(3000, () => {
  console.log('Server started');
});
