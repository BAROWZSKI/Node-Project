const express = require("express");
var router = express.Router();

router.get("/",(req,res) => {
    // kullanıcının sessionunu destroy edip onu log out et.
    // bunun için bir ejs dosyası yazmaya gerek yok direkt logout edip index kısmına gönderecez.
});

module.exports = router;