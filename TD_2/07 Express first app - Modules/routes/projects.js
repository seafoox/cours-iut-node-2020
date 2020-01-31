const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    const json = fs.readFileSync(__dirname + '/../projects.json', 'utf8');
    const projects = JSON.parse(json);
    const html = projects.map(project => `
        <div>
            <a href="/projects/${project.id}">
                ${project.id} - ${project.name}
            </a>
        </div>
    `).join('');
    let finalHtml = fs.readFileSync(__dirname + '/../index.html', 'utf8');
    finalHtml = finalHtml.replace('#content#', html);
    res.send(finalHtml);
});

router.get('/:id', (req, res) => {
    const json = fs.readFileSync(__dirname + '/../projects.json', 'utf8');
    let finalHtml = fs.readFileSync(__dirname + '/../index.html', 'utf8');
    const projects = JSON.parse(json);
    const details = getDetails(projects, req.params.id);
    const html = `
        <p>${details.id}</p>
        <p>${details.name}</p>
        <p>${details.description}</p>
        <a href="/projects">Back</a>
    `;
    finalHtml = finalHtml.replace('#content#', html);
    res.send(finalHtml);
});

function getDetails(projects, currentProjectId) {
    currentProjectId = parseInt(currentProjectId, 10);
    const details = projects.find(project => project.id === currentProjectId);
    return details;
}

module.exports = router;
