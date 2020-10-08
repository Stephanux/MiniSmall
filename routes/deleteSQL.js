var express = require('express');
var router = express.Router();

/* POST UPDATE via Sequelize raw query . */
router.route('/:id').get(function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        // ici on réalise une requête d'insertion dans une base SQL
        var params_value = [];
        params_value.push(req.params.id); // ajout de l'id passé dan l'URL pour la clause Where
        console.log("params_value :", params_value);
        global.sequelize.query(req.message.sql_query,
            {
                replacements: params_value,
                type: sequelize.QueryTypes.DELETE
            })
            .then(function (result) { // sql query success
                console.log('listes retour updateSQL : ', result);
                res.redirect(req.message.redirect);
            }).catch(function (err) { // sql query error
                console.log('error select', err);
                res.send('Erreur : ' + err);
            });
    } else {
        res.redirect('/');  // affichage boîte de login si pas authentifié
    }
});

module.exports = router;