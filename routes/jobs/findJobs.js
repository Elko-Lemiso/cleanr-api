const express = require('express');
const router  = express.Router();
const Job = require('../../models/Job')

router.get('/findJobs', (req, res, next) =>{
  debugger
    Job
        .find({})
        .then((allJobs)=>{
          debugger
          allJobs.forEach(job => {
            job.populate('creator')
          });
          res.json(allJobs)

        })
        .catch(error =>{
          console.log('This is the invalid field ->', error)
      })
})
module.exports = router;