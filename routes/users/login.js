const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.post("/login", (req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;
  if (email === undefined || password === undefined) {
    res
    .status(401)
    .json({ error: 'emptyField'});
      return;
    }
  User.findOne({"email": email})
  .then(user =>{
        if (!user) {
          res.status(401).json({error: "email" });
          return;
        }
        if(bcrypt.compareSync(password, user.password)){
          debugger
          let {email, firstname, lastname, id, userType} = user;
          let sessionData = {email, firstname, lastname, id, userType};
          req.session.user = sessionData;
          res.status(200).json({sessionData});
        }else{
          res.status(401).json({error: 'password'});
        }
  })
  .catch(error => {
    res.status(401).json({error: 'Unauthorized'});
  })
})
module.exports = router;