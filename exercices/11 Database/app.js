const express = require("express");
const session = require("express-session");
const defaultRoutes = require("./routes/default");
const projectsRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");
const loginRoutes = require("./routes/login");

const app = express();

const sessionParams = {
  secret: "my_secret",
  maxAge: 24 * 60 * 60 * 1000
};
app.use(session(sessionParams));

app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    res.locals.username = req.session.username;
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

app.listen("3000", () => {
  console.log("Server started");
});
