const express = require("express");
var router = express.Router();

router.get("/", (req,res) => {
    res.render("register");
});

router.post("/", (req,res) => {
    // kullanıcının name , email ve passwordunu db nin altındaki modele kaydedeceğimiz kısım. Ve onu login kısmına yönlendireceğiz.
});

module.exports = router;