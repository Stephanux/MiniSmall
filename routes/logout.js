var express = require('express');
var router = express.Router();
/* set logout action and redirect to login page. */
router.get('/', function(req, res, next) {
        if ((req.session.passport) && (req.session.passport.user != null)) {
             req.logout(); // efface de la session.passport la propriété user
             res.redirect('/');
        } else  res.redirect('/');
});
module.exports = router;