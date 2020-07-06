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
      debugger
      (req.body.status)? 
    Job
      .findByIdAndUpdate({_id : req.body.job }, {cleanerId : req.body.user})
      .then((response)=>{
        res.json({message: response});
      })
      .catch(error=>{
        res.json({error: error});
        console.log(error, "Error updating userprofile");
      })
      :
      Job
      .findByIdAndUpdate({_id : req.body.job }, {$pull : {applicants : req.body.user} })
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