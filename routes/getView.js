var express = require('express');
var router = express.Router();

/*  GET view page without to access to the database */
router.get('/', function (req, res, next) {
        console.log("from getView ");
        res.render(req.message.view, {
            title: req.message.title,
            libelle: req.message.libelle,
            form_action: req.message.form_action
        });
 
});

module.exports = router;