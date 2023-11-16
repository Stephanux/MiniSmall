var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

/* POST add page. */
router.post('/', upload.single('doc_pdf'), (req, res, next) => {
    if ((req.session.passport) && (req.session.passport.user != null)) {

        // gestion du fichier uploaded via multer.
        console.log('file : ', req.file); // contient les infos sur le fichier uploadé
        console.log('body : ', req.body); // contient les autres données du formulaire
        req.body[req.file.fieldname] = req.file.originalname;
        fs.rename(req.file.path, req.file.destination + req.file.originalname, () => {
            console.log("\nFile : " + req.file.originalname + " Uploaded and Renamed!\n ");
        });

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