const express = require('express');
const router  = express.Router();
const Job = require('../../models/Job')

router.get('/findjobs', (req, res, next) =>{
  Job.find({}).sort({created_at: -1})
    .populate('creator')
    .then((allJobs)=>{
      res.json(allJobs);
    })
    .catch(error =>{
      console.log('This is the invalid field ->', error)
  })
})

router.get('/findjob/:id', (req, res, next) =>{
  Job.findById(req.params.id)
    .populate("creator")
    .populate("applicants")
    .populate("cleanerId")
    .then((job)=>{
      res.json(job);
    })
    .catch(error =>{
      console.log('This is the invalid field ->', error);
      res.json(error.message);
    })
})

module.exports = router;