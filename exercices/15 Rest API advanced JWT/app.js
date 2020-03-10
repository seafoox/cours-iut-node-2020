const express = require("express");
const session = require("express-session");
const helpers = require("./helpers/helpers");
const defaultRoutes = require("./controllers/default");
const projectsRoutes = require("./controllers/projects");
const contactRoutes = require("./controllers/contact");
const loginRoutes = require("./controllers/login");
const apiRoutes = require('./controllers/api');

const app = express();

const sessionParams = {
  secret: "my_secret",
  maxAge: 24 * 60 * 60 * 1000
};
app.use(session(sessionParams));

// Middleware custom: executé pour chaque nouvelle requete HTTP
app.use((req, res, next) => {
  // Si l'ulisateur est authentifié
  if (req.session && req.session.userId) {
    res.locals.username = req.session.username;
    res.locals.isAuthentificated = true;
  }

  // Si un infoMessage à été ajouté
  if (req.session && req.session.infoMessage) {
    res.locals.infoMessage = req.session.infoMessage;
    req.session.infoMessage = null;
  }
  
  next();
});

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.use("/", defaultRoutes);
app.use("/projects", projectsRoutes);
app.use("/contact", contactRoutes);
app.use("/login", loginRoutes);
app.use("/api", apiRoutes);

let server = app.listen(3000, () => {
  console.log(`Server started. Listening on port ${server.address().port}`);
  helpers.setServerPort(server.address().port);
});
