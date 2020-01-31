const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    const accueilText = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel mollis nibh, quis varius nisi. Mauris volutpat congue mauris eget tristique. Maecenas ligula quam, ultricies id massa sed, gravida pellentesque quam. Fusce dapibus dignissim velit at efficitur. Aliquam mi urna, pulvinar et porttitor eget, luctus sed ipsum. Sed rhoncus, sem et dignissim laoreet, purus risus luctus mi, eget dapibus lacus arcu nec diam. In nec fringilla risus, nec euismod diam. Pellentesque volutpat justo quis nulla viverra, in ornare diam porttitor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sodales est ut felis aliquam, placerat congue arcu finibus.
        Donec molestie augue ut ex tincidunt, id ultrices est egestas. Donec nec congue odio, et interdum urna. Curabitur pellentesque nisi nulla, placerat pharetra erat dignissim in. Curabitur blandit non nunc at molestie. In luctus porta lectus et blandit. Duis id rhoncus dolor. Etiam eget mattis nunc. Ut tincidunt mattis libero eget euismod. Sed pulvinar, risus id fringilla sagittis, nibh dolor mattis felis, eget facilisis orci nunc elementum orci.
        Aenean mollis tortor volutpat tempor semper. Sed et est scelerisque urna viverra consequat iaculis id felis. Nullam condimentum quis lorem et ultricies. Vestibulum gravida purus vitae ex malesuada malesuada. Mauris a varius eros, ornare commodo ipsum. Morbi at urna iaculis, elementum quam eget, ultricies massa. Curabitur orci sapien, placerat quis tortor sed, lacinia tempus ante. Nulla eu semper erat. Etiam mollis, felis vel feugiat convallis, magna nulla accumsan purus, sed ullamcorper ex lacus sit amet enim. Fusce in sollicitudin dui.
    `;
    let html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    html = html.replace('#content#', accueilText);
    res.send(html);
});

app.get('/projects', (req, res) => {
    const json = fs.readFileSync(__dirname + '/projects.json', 'utf8');
    const projects = JSON.parse(json);
    const html = projects.map(project => `
        <div>
            <a href="/projects/${project.id}">
                ${project.id} - ${project.name}
            </a>
        </div>
    `).join('');
    let finalHtml = fs.readFileSync(__dirname + '/index.html', 'utf8');
    finalHtml = finalHtml.replace('#content#', html);
    res.send(finalHtml);
});

app.get('/projects/:id', (req, res) => {
    const json = fs.readFileSync(__dirname + '/projects.json', 'utf8');
    let finalHtml = fs.readFileSync(__dirname + '/index.html', 'utf8');
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

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
