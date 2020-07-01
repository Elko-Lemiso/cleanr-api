const express = require('express');
const router  = express.Router();
const User = require('../../models/User');

router.get("/:userid", (req, res, next)=>{

  User.findById(req.params.userid)
  .then(user =>{
    if (user) {
      res.json({user});
    } else{
      res.status(401).json({errorMessage: 'User not found'});
    }
  })
  .catch(error => {
    console.log(error, 'error');
  })
})

module.exports = router;