var express = require('express');
var router = express.Router();

/* GET data content listing. */
router.get('/', function(req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        // ici on réalise une requête
        let i = 0; // indice pour parcourir le tableau req.message.tables_list
        let results = {};

        function getDataFromTable(i, cbk) {
            if (i < req.message.tables_list.length) {
                global.sequelize.query(req.message.sql_list[i], {
                        type: sequelize.QueryTypes.SELECT
                    })
                    .then(function(result) { // sql query success
                        console.log('listes des données : ', result);
                        // on copie les données obtenues par la requête dans la variable data
                        results[req.message.tables_list[i]] = result;
                        getDataFromTable(i + 1, cbk)
                    }).catch(function(err) { // sql query error
                        console.log('error select', err);
                        //res.send("error : ", err);
                    });

            } else {
                cbk(); // appel de la callback pour faire le rendu
            }
        }

        getDataFromTable(i, function() {
            if (req.message.return_type == null) {
                // récupérer les données extraites de la base et les envoyées à une vue
                params_render = {};
                for (param in global.actions_json[req.message.action]) {
                    params_render[param] = (global.actions_json[req.message.action])[param];
                }
                params_render["datas"] = results;
                params_render["data"] = results[req.message.sql_list[i]];
                params_render["msg"] = req.query.msg;
                console.log("params_render:", params_render);
                res.render(req.message.view, params_render);
            } else {
                res.setHeader('content-type', 'application/json');
                res.send(result);
            }
        });
    } else {
        res.redirect('/'); // affichage boîte de login si pas authentifié
    }
});

module.exports = router;