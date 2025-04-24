const express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db/Database");

const User = db.models.User;

router.get("/",(req,res,next) => {
    res.render("login");
});

router.post("/", async(req,res) => {
    // loginden eleman alıp db den kontrol edip kullanıcıya session olusturma ve redirect etme islemleri
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "there is no user with that email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "sifre yanlis"});
        }

        // creating a user session in there if the user is logged in
        req.session.user = {
            id : user._id,
            name : user.name,
            role : user.role
        }

        res.redirect("/");

    }catch(err){
        res.status(500).json({message: "sunucu hatasi"});
    }
});

module.exports = router;