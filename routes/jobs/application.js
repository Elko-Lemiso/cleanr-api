const express = require('express');
const router  = express.Router();
const uploadCloud = require('../../config/cloudinary');
const Job = require('../../models/Job');
const User = require('../../models/User')

router.post('/application', (req, res, next)=>{
  Job
    .findByIdAndUpdate({_id : req.body.job }, {$push : {applicants : req.body.user} })
    .then((response)=>{
      res.json({message: response});
    })
    .catch(error=>{
      res.json({error: error});
      console.log(error, "Error updating userprofile");
    })
})

  router.post('/applicationResponse', (req, res, next)=>{
    let array = []
      (req.body.status)? 
        Job
        .findById({_id : req.body.job }).updateMany({cleanerId : req.body.user}, {status: "inProgress"}, { $set : {applicants : []}})
        .then((response)=>{
          debugger
          res.json({message: response});
          return User.findByIdAndUpdate({_id : req.body.user }, {$push : {jobsTaken : req.body.job} })     
        })
        .catch(error=>{
            res.json({error: error});
            console.log(error, "Error updating userprofile");
        })
      :
        Job
        .findByIdAndUpdate({_id : req.body.job }, {$pull : {applicants : req.body.user} })
        .then((response)=>{
            res.json({message: response});
        })
        .catch(error=>{
            res.json({error: error});
            console.log(error, "Error updating userprofile");
        })
  })
  
  module.exports = router;