const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  const json = fs.readFileSync(__dirname + '/../projects.json', 'utf8');
  const projectsList = JSON.parse(json);
  res.render('projects', { 
    projectsList: projectsList,
    title: 'Projets'
  });
});

router.get('/:id', (req, res) => {
  const json = fs.readFileSync(__dirname + '/../projects.json', 'utf8');
  const projects = JSON.parse(json);
  let details = getDetails(projects, req.params.id);
  res.render('project_details', {
    projectDetails: details,
    title: `Projet ${req.params.id}`
  });
});

// Return { id: '', name: '', description: '' }
function getDetails(projects, currentProjectId) {
    currentProjectId = parseInt(currentProjectId, 10);
    const details = projects.find(project => project.id === currentProjectId);
    return details;
}

module.exports = router;
