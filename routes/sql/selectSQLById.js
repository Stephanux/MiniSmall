var express = require('express');
var router = express.Router();

/* Route utilisant l'id passé dans la requête HTTP GET via req.query.id */
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
                    params_render = {};
                    for (param in global.actions_sql_json[req.message.action]) {
                        params_render[param] = (global.actions_sql_json[req.message.action])[param];
                    }
                    params_render["data"] = result[0];
                    params_render["stitle"] = "Connexion à BD SQL données via Sequelize";
                    console.log("params_render:", params_render);
                    res.render(req.message.view, params_render);
                } else { // si retunr_type = application/json
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
/* Route utilisant l'id passé dans l'URL de la requête HTTP GET via req.params.id */
router.get('/:id', function(req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        var params_value = [];
        var params_value = [];
        params_value.push(parseInt(req.params.id));
        // ici on réalise une requête
        global.sequelize.query(req.message.sql_query, {
                replacements: params_value,
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(result) { // sql query success
                console.log('listes des données : ', result);
                if (req.message.return_type == null) {
                    // récupérer les données extraites de la base et les envoyées à une vue
                    params_render = {};
                    for (param in global.actions_sql_json[req.message.action]) {
                        params_render[param] = (global.actions_sql_json[req.message.action])[param];
                    }
                    params_render["data"] = result[0];
                    params_render["stitle"] = "Connexion à BD SQL données via Sequelize";
                    console.log("params_render:", params_render);
                    res.render(req.message.view, params_render);
                } else { // si retunr_type = application/json
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

/* Route utilisant l'id passé dans la requête HTTP POST via req.body.id */
router.post('/', function(req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        var params_value = [];
        params_value.push(parseInt(req.body.id));
        // ici on réalise une requête
        global.sequelize.query(req.message.sql_query, {
                replacements: params_value,
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(result) { // sql query success
                console.log('listes des données : ', result);
                if (req.message.return_type == null) {
                    // récupérer les données extraites de la base et les envoyées à une vue
                    params_render = {};
                    for (param in global.actions_sql_json[req.message.action]) {
                        params_render[param] = (global.actions_sql_json[req.message.action])[param];
                    }
                    params_render["data"] = result[0];
                    params_render["stitle"] = "Connexion à BD SQL données via Sequelize";
                    console.log("params_render:", params_render);
                    res.render(req.message.view, params_render);
                } else { // si retunr_type = application/json
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