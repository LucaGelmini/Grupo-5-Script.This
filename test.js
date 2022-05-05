const path = require('path');
const db = require(path.join(__dirname, './src/database/models'));

db.User.findOne({
    where: {name: 'vgoss0'}
}).then(usuario => console.log(usuario))