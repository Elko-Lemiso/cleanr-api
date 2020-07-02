const express = require('express');
const router  = express.Router();
const Job = require('../../models/Job')
const uploadCloud = require('../../config/cloudinary');

router.post('/addjob', uploadCloud.multiple('profilePicture'), (req, res, next) =>{
    let newJob = {
        title: req.body.title,
        description: req.body.description,
        rate: req.body.rate,
        dueDate: req.body.dueDate,
        address: {
          street: req.body.street,
          houseNr: req.body.houseNr,
          houseNrAddition: req.body.houseNrAddition,
          zipCode: req.body.zipCode,
          city: req.body.city,
          long: req.body.long,
          lat: req.body.lat,
        },
        images: {}
    }
    if (req.file) {
        newJob.images = {
            fieldname: req.file.fieldname,
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
        }
    
    
    }

    // to check if all fields are filled
    if (!newJob.title || !newJob.description || !newJob.rate || !newJob.dueDate || !newJob.address 
      || !newJob.address.street || !newJob.address.houseNr || !newJob.address.zipCode || !newJob.address.city) {
        res.json({ errorMessage: 'Please fill in the required fields.' });
        return;
    }
    Job
        .create(newJob)
        .then((job)=>{
          res.status(200).json(sessionData);
        })
        .catch(error =>{
          console.log('This is the invalid field ->', error)
      })
})
module.exports = router;