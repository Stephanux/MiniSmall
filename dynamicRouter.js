var express = require("express");
var router = express.Router();
var appContext;
var url = require("url");
var fs = require('fs');

function dynamicRouter(app) {
    //-- Context applicatif
    appContext = app;
    // -- Perform Automate action
    router.use(manageAction);
    // -- routeur global
    appContext.use(router);
}

/* Fonction qui permet d'aguiller les requêtes HTTP 
vers le bon contrôleur en fonction de l'action du pathname  */
function manageAction(req, res, next) {
    req.message = {};
    var path = req.originalUrl; // Le pathname après le port 3000 dans l'URL.
    if (path.includes("?")) {
        path = path.split('?')[0];
        if (path.split('/').length > 0) path = '/' + path.split('/')[1]
    }
    else if (path.split('/').length > 0) path = '/' + path.split('/')[1]
    var type = req.method;
    // On défini la clé de l'annuaire config_actions.json dans une variable "action"
    req.message.action = type + path;

    /*chargement de la configuration JSON des paramètres possibles */
    global.params_json = JSON.parse(fs.readFileSync("./config_params.json", "utf8"));

    /***************************************************************************************************** */
    /** AJOUT DE L'ENSEMBLE DES PARAMETRES DU FICHIERS "CONFIG_ACTIONS.JSON" DANS LE MESSAGE ASSOCIE A REQ */
    /***************************************************************************************************** */
    for (let i=0;i<params_json.length;i++) {
        if ((global.actions_json[req.message.action])[params_json[i]] != null) {
            req.message[params_json[i]] = (global.actions_json[req.message.action])[params_json[i]];
        }
    }
    // (...) Il est possible ici d'ajouter des variables à l'annuaire config_actions.json 
    // en fonction des besoins du développeur en intégrant le nom du param dans config_params.json.

    // Si l'action n'est pas définie dans l'annuaire, on log l'erreur
    if (typeof global.actions_json[req.message.action] == 'undefined') {
        console.log("Erreur: Pas d'action dans l'annuaire config_actions.json : " + path);
        next();
    }
    else {
        instanceModule = require('./routes/' + req.message.controler);
        router.use(path, instanceModule);
        next();
    }
}

module.exports = dynamicRouter;