var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

/* POST add page. */
router.post('/', upload.fields(fieldUpload), (req, res, next) => {
    if ((req.session.passport) && (req.session.passport.user != null)) {

        // gestion du fichier uploaded via multer.
        console.log('files : ', req.files); // contient les infos sur les fichiers uploadés
        console.log('body : ', req.body); // contient les autres données du formulaire
        for (let i = 0; i < fieldUpload.length; i++) {
            req.body[fieldUpload[i].name] = req.files[fieldUpload[i].name][0].originalname;
            fs.renameSync(req.files[fieldUpload[i].name][0].path, req.files[fieldUpload[i].name][0].destination + req.files[fieldUpload[i].name][0].originalname);
        }

        // insertion effective dans la base de données
        global.sequelize.query(req.message.request, {
                replacements: Object.values(req.body),
                type: sequelize.QueryTypes.INSERT
            })
            .then((datas) => {
                console.log('listes des datas : ', datas);
                res.redirect(req.message.redirect + '?msg=Ajout correctement effectué');
            }) // SQL query error return error into callback
            .catch((err) => {
                console.log('error select', err);
                res.redirect(req.message.redirect + '?msg=Il y a une erreur');
            });
    } else {
        res.redirect('/')
    }
});

module.exports = router;