const express = require("express");
var router = express.Router();

router.get("/",(req,res,next) => {
    res.render("upload.ejs");
})

module.exports = router;