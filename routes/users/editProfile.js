const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const uploadCloud = require('../../config/cloudinary');

router.post('/editprofile', (req, res, next)=>{
  debugger
  const findUser = req.params.userid;
  const change = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    // email: req.body.email,
    // password: hash,
    userType: req.body.userType,
    address: {
      street: req.body.street,
      houseNr: req.body.houseNr,
      houseNrAddition: req.body.houseNrAddition,
      zipCode: req.body.zipCode,
      city: req.body.city,
      long: req.body.long,
      lat: req.body.lat,
    },
    bio: req.body.bio,
    telNr: req.body.telNr,
    chamberOfCommerceNr: req.body.chamberOfCommerceNr
  }

  User.findByIdAndUpdate(findUser, change)
    .then((response)=>{
      res.json({message: response});
    })
    .catch(error=>{
      console.log(error, "Error updating userprofile")
    })
})

// router.post('/editprofilepicture', uploadCloud.single("profilePicture"), (req, res, next)=>{
//   const findUser = req.params.userid;
//   const change = {
//     profilePicture: {
//       fieldname: req.file.fieldname,
//       filename: req.file.filename,
//       originalname: req.file.originalname,
//       path: req.file.path
//     }
//   }

//   User.findByIdAndUpdate(findUser, change)
//     .then(()=>{
//         res.render('user/editProfile');
//     })
//     .catch(error=>{
//         console.log(error, "Error updating userprofile")
//     })
// })

module.exports = router;
