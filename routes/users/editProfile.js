const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const uploadCloud = require('../../config/cloudinary');

router.post('/editprofile', (req, res, next)=>{

  const findUser = req.body._id;
  const change = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    // email: req.body.email,
    // password: hash,
    userType: req.body.userType,
    address: {
      street: req.body.address.street,
      houseNr: req.body.address.houseNr,
      houseNrAddition: req.body.address.houseNrAddition,
      zipCode: req.body.address.zipCode,
      city: req.body.address.city,
      long: req.body.address.long,
      lat: req.body.address.lat,
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
      res.json({error: error});
      console.log(error, "Error updating userprofile");
    })
})

router.post('/editprofilepicture/:userid', uploadCloud.single('profilePicture'), (req, res, next)=>{

  const findUser = req.params.userid;
  const change = {
    profilePicture: {
      fieldname: req.file.fieldname,
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path
    }
  }

  User.findByIdAndUpdate(findUser, change)
    .then((response)=>{
        res.json({message: response});
    })
    .catch(error=>{
      res.json({error: error});
      console.log(error, "Error updating profile picture");
    })
})

module.exports = router;
