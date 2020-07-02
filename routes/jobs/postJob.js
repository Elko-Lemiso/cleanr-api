const express = require('express');
const router  = express.Router();
const Job = require('../../models/Job')
const uploadCloud = require('../../config/cloudinary');

router.post('/postJob', uploadCloud.array('profilePicture'), (req, res, next) =>{
    let newJob = {
        title: req.body.title,
        description: req.body.description,
        rate: req.body.rate,
        dueDate: req.body.dueDate,
        address: {
          street: req.body.address.street,
          houseNr: req.body.address.houseNr,
          houseNrAddition: req.body.address.houseNrAddition,
          zipCode: req.body.address.zipCode,
          city: req.body.address.city,
          long: req.body.address.long,
          lat: req.body.address.lat,
        },
        images: []
    }
    if (req.files) {
        newJob.images.push({
            fieldname: req.files.fieldname,
            filename: req.files.filename,
            originalname: req.files.originalname,
            path: req.files.path
        })
    }

    // to check if all fields are filled
    if (!newJob.title || !newJob.description || !newJob.rate || !newJob.dueDate 
      || !newJob.address.street || !newJob.address.houseNr || !newJob.address.zipCode || !newJob.address.city) {
        debugger
        res.json({ errorMessage: 'Please fill in the required fields.' });
        return;
    }
    Job
        .create(newJob)
        .then((job)=>{
        console.log(job)
          res.status(200).json(job);
        })
        .catch(error =>{
          console.log('This is the invalid field ->', error)
      })
})
module.exports = router;