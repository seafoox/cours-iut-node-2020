const express = require('express');

const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    let html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
    let formHtml = '';
    let messageHtml = '';
    if (req.query.status) {
        messageHtml = `
            <p><strong>Message envoyé</strong></p>
        `;
    }
    formHtml += `
        <form action="/contact/send" method="post">
            <label for="message">Votre message: </label>
            <textarea id="message" type="text" name="message_field" value="Saisir votre messsage"></textarea>
            <input type="submit" value="Envoyer">
        </form>
    `;
    html = html.replace('#content#', messageHtml + formHtml);
    res.send(html);
});

router.post('/send', (req, res) => {
    let params = req.body;
    console.log(params);
    res.redirect('/contact?status=sent');
});

module.exports = router;
