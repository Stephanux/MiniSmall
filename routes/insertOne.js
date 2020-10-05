var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* Insert one new user into database. */
router.route('/').get(function (req, res) {
    console.log('req.originalUrl : ', req.originalUrl);
    if (!req.query.hasOwnProperty("_id")) req.query._id = new ObjectId();
    global.schemas[req.message.modelName].create([req.query],
        function (err, result) {
            if (err) {
                throw err;
            }
            console.log('insertOne mongoose: ', result);
            // on refait une requête pour récupérer tous les enregs du modelName
            global.schemas[req.message.modelName].find({}, function (err, result2) {
                console.log("result into deleteUser : ", result2);
                res.render(req.message.view, {
                    title: req.message.title,
                    data: result2[0]
                });
            });
        } // fin callback de l'insert
    ); // fin de l'insert()
}); // fin de la gestion de la route

router.route('/').post(function (req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        // On doit créer via Mongoose un _id pour faire l'insertion dans la base
        if (!req.body._id) req.body._id = new ObjectId();
        global.schemas[req.message.modelName].create([req.body],
            function (err, result) {
                if (err) {
                    throw err;
                }
                console.log('insertOne mongoose: ', result);
                // on refait une requête pour récupérer tous les enregs du modelName
                global.schemas[req.message.modelName].find({}, function (err, result2) {
                    console.log("result into deleteUser : ", result2);
                    res.render(req.message.view, {
                        title: req.message.title,
                        data: result2
                    });
                });
            } // fin callback de l'insert
        ); // fin de l'insert()
    } else {
        res.redirect('/');
    }
}); // fin de la gestion de la route
module.exports = router;