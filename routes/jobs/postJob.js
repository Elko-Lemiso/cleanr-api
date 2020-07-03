const express = require('express');
const router  = express.Router();
const Job = require('../../models/Job')
const uploadCloud = require('../../config/cloudinary');

router.post('/postJob', uploadCloud.array('images'), (req, res, next) =>{
    let newJob = {
        title: req.body.title,
        description: req.body.description,
        rate: req.body.rate,
        dueDate: null,
        cleanerId : null,
        applicants : [null],
        address: {
          street: null,
          houseNr: null,
          houseNrAddition: null,
          zipCode: null,
          city: null,
          long: null,
          lat: null,
        },
        images: [null]
    }
    // if (req.files) {
    //     newJob.images.push({
    //         fieldname: req.files.fieldname,
    //         filename: req.files.filename,
    //         originalname: req.files.originalname,
    //         path: req.files.path
    //     })
    // }

    // to check if all fields are filled
    if (!newJob.title || !newJob.description) {
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