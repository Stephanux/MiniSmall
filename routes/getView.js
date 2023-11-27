var express = require('express');
var router = express.Router();

/*  GET view page without to access to the database */
router.get('/', function(req, res, next) {
    console.log("from getView ");
    params_render = {};
    for (param in global.actions_json[req.message.action]) {
        params_render[param] = (global.actions_json[req.message.action])[param];
    }
    console.log("params_render :", params_render);
    res.render(req.message.view, params_render);
});

module.exports = router;