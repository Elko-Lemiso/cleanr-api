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
<<<<<<< HEAD
          debugger
          req.session.user = user;
          console.log(req.session);
          let sessionData = req.session.user
          res.status(200).json({sessionData})
=======
          let {email, firstname, lastname, id, userType} = user;
          let sessionData = {email, firstname, lastname, id, userType};
          req.session.user = sessionData;
          res.status(200).json({sessionData});
>>>>>>> deb4186919e119dd4d196f81b7cab91357469936
        }else{
          res.status(401).json({errorMessage: 'Unauthorized, wrong password'});
        }
  })
  .catch(error => {
      next(error);
  })
})
module.exports = router;