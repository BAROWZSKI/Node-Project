const express = require("express");
var router = express.Router();
const {requireLogin} = require("../middleware/auth");
const db = require("../db/Database");
const multer = require("multer");

const Book = db.models.Book;

// Multer konfigürasyonu
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: function(req, file, cb) {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error("Sadece JPG dosyaları yüklenebilir"));
        }
        cb(null, true);
    }
});



// only logged out users can upload books.
router.get("/",requireLogin, (req,res,next) => {
    res.render("upload.ejs");
});

router.post("/",requireLogin,upload.single("coverImage"), async(req,res) => {
    const { title, author, description, pageCount }  = req.body;

    try{
        const newBook = new Book({
            title,
            author,
            description,
            pageCount: Number(pageCount),
            coverImage: req.file ? req.file.filename : null,
            uploadedBy: req.session.user.id
        });

        await newBook.save();
        res.redirect("/");

    }catch(err){
        console.error(err)
        res.status(500).send("There is problem about a given inputs.");
    }
});

module.exports = router;