var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* Composant générique findOneAndListeMultiSchemas requpete via l'_id un enreg sur modelName puis des appels récursifs 
permettent de récupérer des données d'autres collections pour par exemple créer des listes déroulantes dans l'interface 
utilisateur de l'application cliente  : liste des pays, liste des villes, liste catégorie, ous-catégories, etc ... */
/* Exemple d'URL d'appel :  http://localhost:3000/testOneAndListMultiSchemas/5d2855f6181abe6e1b5f697c */

/* Fonction qui s'exécute suite à une requête HTTP GET */
router.route('/:_id').get(function(req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        global.schemas[req.message.modelName].find({
            _id: new ObjectId(req.params._id)
        }, function(err, result) {
            if (err) {
                throw err;
            }
            console.log('data from findById: ', result);
            var result2 = {};

            function getSchemaFromList(i, cbk) { // fonction récursive pour récupérer des données ressources
                if (i < req.message.modelList.length) {
                    global.schemas[req.message.modelList[i]].find({}, function(err, schema_data) {
                        console.log("schema_data : ", schema_data);
                        result2[req.message.modelList[i]] = schema_data;
                        getSchemaFromList(i + 1, cbk);
                    });
                } else {
                    cbk();
                }
            }
            getSchemaFromList(0, function() {
                console.log("result2 : ", result2);
                if (req.message.return_type == null) {
                    res.render(req.message.view, {
                        title: req.message.title,
                        libelle: req.message.libelle,
                        del_label: req.message.del_label,
                        form_action: req.message.form_action,
                        data: result[0],
                        liste: result2
                    });
                } else {
                    res.setHeader('content-type', 'application/json');
                    res.send({
                        data: result[0],
                        liste: result2
                    });
                }
            });
        });
    } else {
        res.redirect('/'); // affichage boîte de login si pas authentifié
    }
});

/* Fonction qui s'exécute suite à une requête HTTP POST */
router.route('/:_id').post(function(req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        global.schemas[req.message.modelName].find({
            _id: new ObjectId(req.params._id)
        }, function(err, result) {
            if (err) {
                throw err;
            }
            console.log('data from findById: ', result);
            var result2 = [];

            function getSchemaFromList(i, cbk) {
                if (i < req.message.modelList.length) {
                    global.schemas[req.message.modelName].find({}, function(err, schema_data) {
                        result2[req.message.modelList[i]] = schema_data;
                        getSchemaFromList(i + 1, cbk);
                    });
                } else {
                    cbk();
                }
            }
            getSchemaFromList(0, function() {
                console.log("result2 : ", result2);
                if (req.message.return_type == null) {
                    res.render(req.message.view, {
                        title: req.message.title,
                        libelle: req.message.libelle,
                        del_label: req.message.del_label,
                        form_action: req.message.form_action,
                        data: result[0],
                        liste: result2
                    });
                } else {
                    res.setHeader('content-type', 'application/json');
                    res.send({
                        data: result[0],
                        liste: result2
                    });
                }
            });
        });
    } else {
        res.redirect('/'); // affichage boîte de login si pas authentifié
    }
});

module.exports = router;