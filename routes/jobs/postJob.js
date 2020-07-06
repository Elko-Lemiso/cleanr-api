const express = require('express');
const router  = express.Router();
const Job = require('../../models/Job')
const User = require('../../models/User');
const { response } = require('express');
router.post('/postJob', (req, res, next) =>{
    debugger
    let newJob = {
        creator : req.body.creator,
        title: req.body.title,
        description: req.body.description,
        rate: req.body.rate,
        status: 'pending',
        dueDate: null,
        cleanerId : null,
        applicants : [],
        address: {
          street: null,
          houseNr: null,
          houseNrAddition: null,
          zipCode: null,
          city: null,
          long: null,
          lat: null,
        },
        images: []
    }
    if (!newJob.title || !newJob.description) {
        debugger
        res.json({ errorMessage: 'Please fill in the required fields.' });
        return;
    }
    Job
        .create(newJob)
        .then((job)=>{
          res.status(200).json(job);
          return User.findByIdAndUpdate({_id: req.body.creator}, {$push : {jobsUploaded : job.id} }) 
        })
        .catch(error =>{
          console.log('This is the invalid field ->', error)
      })
})
module.exports = router;