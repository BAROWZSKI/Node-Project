var express = require('express');
var router = express.Router();

const users = [
  {
    name:"yigit",
    kitaplar: "kucuk prens, boyle buyurdu zerdust, dirilis"
  },
  {
    name:"cevdet",
    kitaplar: "devlet ana, devlet"
  }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("users", {users});
});

module.exports = router;
