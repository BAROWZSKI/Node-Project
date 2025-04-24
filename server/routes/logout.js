const express = require("express");
var router = express.Router();

router.get("/",(req,res) => {
    // kullanıcının sessionunu destroy edip onu log out et.
    // bunun için bir ejs dosyası yazmaya gerek yok direkt logout edip index kısmına gönderecez.
    req.session.destroy(err => {
        if(err){
            return res.status(500).send("session error, can't log out.");
        }
        res.clearCookie('connect.sid');
        res.redirect("/login");
    })
});

module.exports = router;