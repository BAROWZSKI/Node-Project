const express = require("express");
var router = express.Router();

router.get("/",(req,res,next) => {
    res.render("login");
});

router.post("/", (req,res) => {
    // loginden eleman alıp db den kontrol edip kullanıcıya session olusturma ve redirect etme islemleri
});

module.exports = router;