var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* SET user from _id with new data for an update into mongoDB . */
router.route('/:_id').get(function (req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        global.schemas[req.message.modelName].updateOne({ _id: new ObjectId(req.params._id) },
            { $set: req.query },
            function (err, result) {
                if (err) { throw err; }
                console.log('from updateById: ', result);
                global.schemas[req.message.modelName].find({ _id: new ObjectId(req.params._id) }, function (err, result) {
                    if (err) { throw err; }
                    console.log('users: ', result);
                    res.render(view, {
                        title: req.message.title,
                        data: result[0]
                    });
                }); // fin du find() après update
            } // fin callback de l'update
        ); // fin de l'update()
    } else {
        res.redirect('/');  // affichage boîte de login si pas authentifié
    }
}); // fin de la gestion de la route

/* SET user from _id with new data for an update into mongoDB . */
router.route('/:_id').post(function (req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        global.schemas[req.message.modelName].updateOne({ _id: new ObjectId(req.params._id) },
            { $set: req.query },
            function (err, result) {
                if (err) { throw err; }
                console.log('from updateById: ', result);
                global.schemas[req.message.modelName].find({ _id: new ObjectId(req.params._id) }, function (err, result) {
                    if (err) { throw err; }
                    console.log('users: ', result);
                    res.render(req.message.view, {
                        title: req.message.title,
                        data: result[0]
                    });
                }); // fin du find() après update
            } // fin callback de l'update
        ); // fin de l'update()
    } else {
        res.redirect('/');  // affichage boîte de login si pas authentifié
    }
}); // fin de la gestion de la route


module.exports = router;