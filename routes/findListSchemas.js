var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* Composant générique findListSchemas requête via des appels récursifs et permet de
récupérer des données de plusieurs collections pour par exemple créer des listes déroulantes 
dans l'interface utilisateur de l'application cliente  : liste des pays, liste des villes, 
liste catégorie, ous-catégories, etc ... */
/* Exemple d'URL d'appel :  http://localhost:3000/testOneAndListMultiSchemas/5d2855f6181abe6e1b5f697c */

/* Fonction qui s'exécute suite à une requête HTTP GET */
router.get('/', function (req, res, next) {
    var result2 = {};
    function getSchemaFromList(i, cbk) {
        if (i < req.message.modelList.length) {
            global.schemas[req.message.modelList[i]].find({}, function (err, schema_data) {
                console.log("schema_data : ", schema_data);
                result2[req.message.modelList[i]] = schema_data;
                getSchemaFromList(i + 1, cbk);
            });
        }
        else {
            cbk();
        }
    }
    getSchemaFromList(0, function () {
        console.log("result2 : ", result2);
        if (req.message.return_type == null) {
            res.render(req.message.view, {
                title: req.message.title,
                libelle: req.message.libelle,
                del_label: req.message.del_label,
                form_action: req.message.form_action,
                liste: result2
            });
        } else {
            res.setHeader('content-type', 'application/json');
            res.send({ data: result[0], liste: result2 });
        }
    });
});

/* Fonction qui s'exécute suite à une requête HTTP POST */
router.post('/', function (req, res, next) {
    var result2 = {};
    function getSchemaFromList(i, cbk) {
        if (i < req.message.modelList.length) {
            global.schemas[req.message.modelList[i]].find({}, function (err, schema_data) {
                console.log("schema_data : ", schema_data);
                result2[req.message.modelList[i]] = schema_data;
                getSchemaFromList(i + 1, cbk);
            });
        }
        else {
            cbk();
        }
    }
    getSchemaFromList(0, function () {
        console.log("result2 : ", result2);
        if (req.message.return_type == null) {
            res.render(req.message.view, {
                title: req.message.title,
                libelle: req.message.libelle,
                del_label: req.message.del_label,
                form_action: req.message.form_action,
                liste: result2
            });
        } else {
            res.setHeader('content-type', 'application/json');
            res.send({ data: result[0], liste: result2 });
        }
    });
});

module.exports = router;