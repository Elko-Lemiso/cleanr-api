const express = require('express');
const router  = express.Router();
const Job = require('../../models/Job')

router.get('/findjobs', (req, res, next) =>{
  Job.find({})
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
    .then((job)=>{
      res.json(job);
    })
    .catch(error =>{
      console.log('This is the invalid field ->', error);
      res.json(error.message);
    })
})

module.exports = router;