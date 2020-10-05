/* ******************************************************
**  Module générique pour faire un "populate()" sans filtre *
** ******************************************************/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        global.schemas[req.message.modelName].find({}).populate(req.message.pop_ref)
            .exec(function (err, result) {
                if (err) {
                    console.log("error: ", err);
                    return handleError(err);
                } else {
                    console.log(result);
                    if (result.length == 0) result = null;
                    if (req.message.return_type == null) {
                        res.render(req.message.view, {
                            title: req.message.title,
                            data: result
                        });
                    } else {
                        res.send(JSON.stringify(result));
                    }
                }
            }
        );
    } else {
        res.redirect('/');  // affichage boîte de login si pas authentifié
    }
});

module.exports = router;