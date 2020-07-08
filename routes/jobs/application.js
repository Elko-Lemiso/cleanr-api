const express = require('express');
const router  = express.Router();
const uploadCloud = require('../../config/cloudinary');
const Job = require('../../models/Job');
const User = require('../../models/User')
const Conversation = require('../../models/Conversation');

router.post('/application', (req, res, next)=>{
  debugger
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
        .find({_id : req.body.job})
        .then(()=>{
          Job.findById({_id : req.body.job}).update({applicants:[]})
          .catch(error=>{
            res.json({error: error});
        })
        })
        .then(()=>{
          Job.findById({_id : req.body.job}).update({status: "inProgress"})
          .catch(error=>{
            res.json({error: error});
        })
        })
        .then(()=>{
          Job.findById({_id : req.body.job}).update({cleanerId : req.body.user})
          .catch(error=>{
            res.json({error: error});
        })
        })
        .then(()=>{
          debugger
            Conversation.find({jobId :req.body.job})
            .then(conversation=>{
              res.json(conversation)
            })
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
            debugger
            res.json({message: response});
        })
        .catch(error=>{
            res.json({error: error});
            console.log(error, "Error updating userprofile");
        })
  })
  
  module.exports = router;