const express = require('express');
const router  = express.Router();
const User = require('../../models/User')
const uploadCloud = require('../../config/cloudinary');

router.post('/signup', uploadCloud.single('profilePicture'), (req, res, next) =>{
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    let newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
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
        profilePicture: {}
    }
    
    if (req.file) {
        newUser.profilePicture = {
            fieldname: req.file.fieldname,
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
        }
    }

    // to check if all fields are filled
    if (!newUser.email || !newUser.password || !newUser.firstname || !newUser.lastname || !newUser.userType 
      || !newUser.address.street || !newUser.address.houseNr || !newUser.address.zipCode || !newUser.address.city) {
        res.json({ errorMessage: 'Please fill in the required fields.' });
        return;
    }
    
    // make sure passwords are strong:
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(newUser.password)) {
    res
        .status(400)
        .json({ errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
    }

    User
        .create(newUser)
        .then((user)=>{
          console.log(user);
          let {email, firstname, lastname, id, userType} = user;
          let sessionData = {email, firstname, lastname, id, userType};
          req.session.user = sessionData;
          res.status(200).json(sessionData);
        })
        .catch(error =>{
          console.log('This is the invalid field ->', error)
      })
})

module.exports = router;

