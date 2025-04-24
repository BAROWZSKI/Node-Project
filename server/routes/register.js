const express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db/Database");

const User = db.models.User;

router.get("/", (req,res) => {
    if(req.session.user){
        // if a user already have a session
        return res.redirect("/");
    }
    res.render("register");
});

router.post("/",async (req,res) => {
    // kullanıcının name , email ve passwordunu db nin altındaki modele kaydedeceğimiz kısım. Ve onu login kısmına yönlendireceğiz.
    const {name , email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "this is already existing email"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role : 'user'
        });

        await newUser.save();
        res.redirect("/login");
        console.log(newUser);

    }catch(err){
        res.status(500).json({message : "sunucu hatasi"});
    }
});

module.exports = router;