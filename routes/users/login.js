const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.post("/login", (req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "") {
    res
    .status(401)
    .json({ errorMessage: 'Unauthorized, nothing passed into fields' });
      return;
    }
  User.findOne({"email": email})
  .then(user =>{
        if (!user) {
          res.json({errorMessage: "The email doesn't exist." });
          return;
        }
        if(bcrypt.compareSync(password, user.password)){
          debugger
          req.session.user = user;
          console.log(req.session);
          let sessionData = req.session.user
          res.status(200).json({sessionData})
        }else{
          res.status(401).json({errorMessage: 'Unauthorized, wrong password'});
        }
  })
  .catch(error => {
      next(error);
  })
})
module.exports = router;