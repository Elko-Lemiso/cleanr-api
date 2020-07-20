const express = require('express');
const router  = express.Router();
const Job = require('../../models/Job')
const User = require('../../models/User')

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

router.get('/findclientjobs/:id', (req, res, next) =>{
  Job
  .find({creator: req.params.id})
  .populate("creator")
  .then((jobs)=>{
    res.json(jobs);
  })
  .catch(error =>{
    console.log('This is the invalid field ->', error)
  })
})


router.get('/findcleanerjobs/:id', (req, res, next) =>{
  Job
  .find({cleanerId: req.params.id})
  .populate("creator")
  .then((jobs)=>{
    res.json(jobs);
  })
  .catch(error =>{
    console.log('This is the invalid field ->', error)
  })
})

module.exports = router;