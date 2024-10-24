import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.isAuthenticated){
    res.send(`Here is where I would put information about you
      with your name being: (${req.session.account.name})
      and your username being: ${req.session.account.username}`)
  }else{
    res.status(403).send("Error: You must be logged in")
  }
});


export default router;
