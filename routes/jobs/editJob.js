const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const uploadCloud = require('../../config/cloudinary');
const Job = require('../../models/Job');

router.post('/editJob', uploadCloud.array('images'), (req, res, next)=>{
  debugger

  const findJob = req.body.jobId;
  
  let change = {
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
  }
  Job.update(findJob, change)
    .then((response)=>{
      debugger
      res.json({message: response});
    })
    .catch(error=>{
      res.json({error: error});
      console.log(error, "Error updating userprofile");
    })
})

router.post('/editJob/images', uploadCloud.array('images'), (req, res, next)=>{
  const findJob = req.body.jobId;
  let images = []
  if (req.files) {
   req.files.forEach(file => {
        images.push({
           fieldname: file.fieldname,
           filename: file.filename,
           originalname: file.originalname,
           path: file.path
       })
     })
   }
  let change = {
        images: images
  }   
  Job
    .update({_id: `${findJob}`}, {$push : {images : {change}}})
    .then((response)=>{
      debugger
      res.json({message: response});
    })
    .catch(error=>{
      res.json({error: error});
      console.log(error, "Error updating userprofile");
    })
})

module.exports = router;
