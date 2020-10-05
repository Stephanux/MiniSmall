/* *********************************************************
**  Module générique pour faire un "deleteOne()" via l’_id *
** *********************************************************/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* DELETE record from _id into url and into config_actions.json */
router.route('/:_id').get(function (req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        global.schemas[req.message.modelName].deleteOne({ _id: new ObjectId(req.params._id) }, function (err, result) {
            if (err) {
                throw err;
            }
            global.schemas[req.message.modelName].find({}, function (err, result2) {
                console.log("result after deleteById : ", result2);
                res.render(req.message.view, {
                    title: req.message.title,
                    data: result2
                });
            });
        });
    } else {
        res.redirect('/');
    }
});
module.exports = router;