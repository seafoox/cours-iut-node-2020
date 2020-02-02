const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    const accueilText = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel mollis nibh, quis varius nisi. Mauris volutpat congue mauris eget tristique. Maecenas ligula quam, ultricies id massa sed, gravida pellentesque quam. Fusce dapibus dignissim velit at efficitur. Aliquam mi urna, pulvinar et porttitor eget, luctus sed ipsum. Sed rhoncus, sem et dignissim laoreet, purus risus luctus mi, eget dapibus lacus arcu nec diam. In nec fringilla risus, nec euismod diam. Pellentesque volutpat justo quis nulla viverra, in ornare diam porttitor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sodales est ut felis aliquam, placerat congue arcu finibus.
        Donec molestie augue ut ex tincidunt, id ultrices est egestas. Donec nec congue odio, et interdum urna. Curabitur pellentesque nisi nulla, placerat pharetra erat dignissim in. Curabitur blandit non nunc at molestie. In luctus porta lectus et blandit. Duis id rhoncus dolor. Etiam eget mattis nunc. Ut tincidunt mattis libero eget euismod. Sed pulvinar, risus id fringilla sagittis, nibh dolor mattis felis, eget facilisis orci nunc elementum orci.
        Aenean mollis tortor volutpat tempor semper. Sed et est scelerisque urna viverra consequat iaculis id felis. Nullam condimentum quis lorem et ultricies. Vestibulum gravida purus vitae ex malesuada malesuada. Mauris a varius eros, ornare commodo ipsum. Morbi at urna iaculis, elementum quam eget, ultricies massa. Curabitur orci sapien, placerat quis tortor sed, lacinia tempus ante. Nulla eu semper erat. Etiam mollis, felis vel feugiat convallis, magna nulla accumsan purus, sed ullamcorper ex lacus sit amet enim. Fusce in sollicitudin dui.
    `;

    let html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
    html = html.replace('#content#', accueilText);
    res.send(html);
});

module.exports = router;
