var express = require('express');
var router = express.Router();
const db = require('../database/postaldb');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('searchbar.html');
});

router.get('/search', function (req, res) {
  let userInput = req.query.search_input;
  console.log(userInput);
  if (userInput) {
    db.query('select * from zipcode where match(search_addr) against(\'"'+ userInput +'"\' in boolean mode) limit 5;', (err, rows) => {
      if (err) throw err;
      res.json(rows);
      // console.log(rows);
    });
  };
})

module.exports = router;