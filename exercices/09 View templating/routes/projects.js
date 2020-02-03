const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  /* TODO */
});

router.get('/:id', (req, res) => {
  /* TODO */
});

function getDetails(projects, currentProjectId) {
    currentProjectId = parseInt(currentProjectId, 10);
    const details = projects.find(project => project.id === currentProjectId);
    return details;
}

module.exports = router;
