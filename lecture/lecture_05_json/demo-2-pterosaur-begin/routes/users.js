import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/1', (req, res) => {
  res.send("responding with info about user 1")
})

export default router;
