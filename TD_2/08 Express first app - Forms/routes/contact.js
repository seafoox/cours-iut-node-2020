const express = require('express');

const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    let html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
    let form;
    if (req.query.status) {
        form = 'Message envoyé';
    } else {
        form = `
            <form action="/contact/send" method="post">
                <label for="message">Votre message: </label>
                <textarea id="message" type="text" name="message_field" value="Saisir votre messsage"></textarea>
                <input type="submit" value="Envoyer">
            </form>
        `;
    }
    html = html.replace('#content#', form);
    res.send(html);
});

router.post('/send', (req, res) => {
    let params = req.body;
    console.log(params);
    res.redirect('/contact?status=sent');
});

module.exports = router;
