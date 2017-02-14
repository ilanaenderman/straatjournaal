const express 	= require('express');
const session 	= require('express-session');
const router	= express.Router( );
const sequelize = require('sequelize');
const db		= require(__dirname + '/../modules/database');

// Require Multer
const multer 	= require('multer');
const storage 	= multer.diskStorage({
    // Declare where to save file
    destination: function(req, file, callback) {
        callback(null, "static/uploads")
    },
    // Declare how to name file
    filename: function(req, file, callback) {
        let newImage = file.fieldname + '-' + Date.now();
        callback(null, newImage)
    }
});
const upload 	= multer({storage: storage});

router.post('/uploadPhoto', upload.single('photo'), (request, response, next) => {
    let file = request.file;
    let ID = request.body.id;
    db.salesman.findOne({
        where: {id: ID}
    }).then( user => {
        user.updateAttributes({
            photo: 'uploads/' + file.filename
        }).then(photo => {
            db.salesman.findAll({
                where: {id: ID}
            }).then(update => {
                response.render('updateAdmin', {update: update, message3: 'Foto toegevoegd.'});
            })
        })
    })
})
module.exports = router;
