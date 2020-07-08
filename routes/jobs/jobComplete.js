const express = require('express');
const router  = express.Router();
const Job = require('../../models/Job')
const User = require('../../models/User');

router.get('/jobComplete/:id', (req, res, next) =>{
    Job
    .findById(req.params.id)
    .update({status: "completed"})
    .then((job)=>{
      res.json(job);
    })
    .catch(error =>{
      console.log('This is the invalid field ->', error)
  })
})
module.exports = router;