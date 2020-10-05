var express = require("express");
var router = express.Router();
var appContext;
var url = require("url");

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
    if (path.split('/').length > 0) path = '/' + path.split('/')[1]
    var type = req.method;
    // On défini la clé de l'annuaire config_actions.json dans une variable "action"
    req.message.action = type + path;
    // On défini ici le nom du contrôler à charger pour faire le traitement de l'action
    if (global.actions_json[req.message.action].controler != null) { // nom du contrôleur à charger
        req.message.controler = global.actions_json[req.message.action].controler;
    }
    // Pour une connexion à la base mongoDB via Mongoose, récupération du nom du modèle Mongoose
    if (global.actions_json[req.message.action].modelName != null) {
        req.message.modelName = global.actions_json[req.message.action].modelName;
    }
    // On défini ici la vue pour le rendu des données sur l'Interface de l'application
    if (global.actions_json[req.message.action].view != null) {
        req.message.view = global.actions_json[req.message.action].view;
    }
    // On défini ici la type du format des données en retour, cela implique que l'on utilisera pas la vue
    if (global.actions_json[req.message.action].return_type != null) {
        req.message.return_type = global.actions_json[req.message.action].return_type;
    }
    // On défini ici la clé externe de la collection pour faire un populate
    if (global.actions_json[req.message.action].pop_ref != null) {
        req.message.pop_ref = global.actions_json[req.message.action].pop_ref;
    }
    // On défini ici la liste des Modèles de Mongoose sur lesquels il faut faire une requête all
    if (global.actions_json[req.message.action].modelList != null) {
        req.message.modelList = global.actions_json[req.message.action].modelList;
    }
    // On défini ici la requête SQL qui sera exécuter par le "controler"
    if (global.actions_json[req.message.action].sql_query != null) {
        req.message.sql_query = global.actions_json[req.message.action].sql_query;
    }
    // On défini ici la chaîne de caratères title pour un affichage dan la vue
    if (global.actions_json[req.message.action].title != null) {
        req.message.title = global.actions_json[req.message.action].title;
    }
    // On défini ici l'action du formulaire pour le placer dans l'attribut "action=" de la balise "<form>"
    if (global.actions_json[req.message.action].form_action != null) {
        req.message.form_action = global.actions_json[req.message.action].form_action;
    }
    // On défini ici un libelle qui peut être utilisé dans un formulaire (sur un bouton par exemple)
    if (global.actions_json[req.message.action].libelle != null) {
        req.message.libelle = global.actions_json[req.message.action].libelle;
    }
    // On défini ici le label du  bouton delete du formulaire
    if (global.actions_json[req.message.action].del_label != null) {
        req.message.del_label = global.actions_json[req.message.action].del_label;
    }
    // (...) Il est possible ici d'ajouter des variables à l'annuaire config_actions.json 
    // en fonction des besoins du développeur

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