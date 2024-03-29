var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* Composant générique findByIdWithList pour lire un enreg via son Id mongodb 
+ une liste d'une autre collection via la variable modelList dans config_actions.json */
/* GET data from _id into url  http://localhost:3040/formUser/5d2855f6181abe6e1b5f697c */
router.route('/:_id').get(function(req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        global.schemas[req.message.modelName].find({
                _id: new ObjectId(req.params._id)
            },
            function(err, result) {
                if (err) {
                    throw err;
                }
                console.log('data from id findByIdWithList : ', result);
                global.schemas[req.message.modelList].find({}, function(err, list) {
                    console.log('list from id findByIdWithList : ', list);
                    res.render(req.message.view, {
                        title: req.message.title,
                        libelle: req.message.libelle,
                        del_label: req.message.del_label,
                        form_action: req.message.form_action,
                        data: result[0],
                        liste: list
                    });
                });

            }
        );
    } else {
        res.redirect('/'); // affichage boîte de login si pas authentifié
    }
});

module.exports = router;