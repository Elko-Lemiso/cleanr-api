const express = require('express');
const router  = express.Router();
const Job = require('../../models/Job')
const User = require('../../models/User');

router.get('/findMyjobs/:id', (req, res, next) =>{
    User
    .findById(req.params.id)
    .populate('jobsUploaded')
    .then((jobs)=>{
      res.json(jobs);
    })
    .catch(error =>{
      console.log('This is the invalid field ->', error)
  })
})
module.exports = router;