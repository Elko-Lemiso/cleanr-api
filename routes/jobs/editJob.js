const express = require('express');
const router  = express.Router();
const uploadCloud = require('../../config/cloudinary');
const Job = require('../../models/Job');
const User = require('../../models/User')

router.post('/editJob', uploadCloud.array('images'), (req, res, next)=>{
  const findJob = req.body.jobId;
  
  Job
    .findByIdAndUpdate(findJob, {
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
        }
    })
    .then((response)=>{
      res.json({message: response});
    })
    .catch(error=>{
      res.json({error: error});
      console.log(error, "Error creating job");
    })
})

router.post('/editJob/images', uploadCloud.single('images'), (req, res, next)=>{
  let newImage = {
          fieldname: req.file.fieldname,
           filename: req.file.filename,
           originalname: req.file.originalname,
           path: req.file.path
  }

 
  Job
    .findByIdAndUpdate({_id : req.body.jobId }, {$push : {images : newImage} })
    .then((response)=>{
      res.json({message: response});
    })
    .catch(error=>{
      res.json({error: error});
      console.log(error, "Error updating userprofile");
    })
})

module.exports = router;
