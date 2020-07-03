const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const uploadCloud = require('../../config/cloudinary');
const Job = require('../../models/Job');

router.post('/editJob', (req, res, next)=>{
  debugger

  const findJob = req.body.jobId;


  const change = {
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
  Job.findByIdAndUpdate(findJob, change)
    .then((response)=>{
      res.json({message: response});
    })
    .catch(error=>{
      res.json({error: error});
      console.log(error, "Error updating userprofile");
    })
})

// router.post('/editprofilepicture/:userid', uploadCloud.single('profilePicture'), (req, res, next)=>{
//   debugger

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
//     .then((response)=>{
//         res.json({message: response});
//     })
//     .catch(error=>{
//       res.json({error: error});
//       console.log(error, "Error updating profile picture");
//     })
// })

module.exports = router;
