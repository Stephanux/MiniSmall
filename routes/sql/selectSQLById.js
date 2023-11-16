var express = require('express');
var router = express.Router();

/* GET data listing. */
router.get('/', function(req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        var params_value = [];
        params_value.push(parseInt(req.query.id));
        // ici on réalise une requête
        global.sequelize.query(req.message.sql_query, {
                replacements: params_value,
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(result) { // sql query success
                console.log('listes des données : ', result);
                if (req.message.return_type == null) {
                    // récupérer les données extraites de la base et les envoyées à une vue
                    res.render(req.message.view, {
                        stitle: 'Connexion à BD SQL données oural-52 via Sequelize',
                        title: req.message.title,
                        libelle: req.message.libelle,
                        del_label: req.message.del_label,
                        form_action: req.message.form_action,
                        data: result[0] // Attention a renvoyer une variable avec un nom generique
                    });
                } else {
                    res.setHeader('content-type', 'application/json');
                    res.send(result);
                }
            }).catch(function(err) { // sql query error
                console.log('error select', err);
            });
    } else {
        res.redirect('/'); // affichage boîte de login si pas authentifié
    }
});
module.exports = router;