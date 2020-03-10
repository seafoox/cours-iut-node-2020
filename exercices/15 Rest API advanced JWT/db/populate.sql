-- INSERT Projects
DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  created_at timestamp default current_timestamp
);

INSERT INTO projects (name, description) VALUES ('super projet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ex nisl, feugiat vel augue eget, faucibus ultricies metus. Vivamus efficitur mi ac dolor pellentesque, non pharetra velit pharetra. Maecenas sit amet sapien quis sem tempor gravida et id diam. Sed dictum odio eros, a accumsan mi eleifend in.');
INSERT INTO projects (name, description) VALUES ('le deuxieme projet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ex nisl, feugiat vel augue eget, faucibus ultricies metus. Vivamus efficitur mi ac dolor pellentesque, non pharetra velit pharetra. Maecenas sit amet sapien quis sem tempor gravida et id diam. Sed dictum odio eros, a accumsan mi eleifend in.');
INSERT INTO projects (name, description) VALUES ('jamais 2 sans 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ex nisl, feugiat vel augue eget, faucibus ultricies metus. Vivamus efficitur mi ac dolor pellentesque, non pharetra velit pharetra. Maecenas sit amet sapien quis sem tempor gravida et id diam. Sed dictum odio eros, a accumsan mi eleifend in.');
INSERT INTO projects (name, description) VALUES ('difficile de trouver des bons titres', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ex nisl, feugiat vel augue eget, faucibus ultricies metus. Vivamus efficitur mi ac dolor pellentesque, non pharetra velit pharetra. Maecenas sit amet sapien quis sem tempor gravida et id diam. Sed dictum odio eros, a accumsan mi eleifend in.');
INSERT INTO projects (name, description) VALUES ('le dernier projet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ex nisl, feugiat vel augue eget, faucibus ultricies metus. Vivamus efficitur mi ac dolor pellentesque, non pharetra velit pharetra. Maecenas sit amet sapien quis sem tempor gravida et id diam. Sed dictum odio eros, a accumsan mi eleifend in.');
INSERT INTO projects (name, description) VALUES ('new project in english', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ex nisl, feugiat vel augue eget, faucibus ultricies metus. Vivamus efficitur mi ac dolor pellentesque, non pharetra velit pharetra. Maecenas sit amet sapien quis sem tempor gravida et id diam. Sed dictum odio eros, a accumsan mi eleifend in.');


-- INSERT Users
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(20),
  firstname VARCHAR,
  lastname VARCHAR,
  unsecured_password VARCHAR(20),
  created_at timestamp default current_timestamp
);

INSERT INTO users (username, firstname, lastname, unsecured_password) VALUES ('seafoox', 'Alexandre', 'Collin', '123456');
INSERT INTO users (username, firstname, lastname, unsecured_password) VALUES ('toto', 'Thomas', 'Dupont', '123456');

