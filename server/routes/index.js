const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req, res, next) => {
  const {username, password} = req.body
  console.log(username, password)
  res.render('index');
});


module.exports = router;
