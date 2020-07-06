const express = require('express');
const router  = express.Router();
const Messages = require('../../models/Messages')

router.post('/getmessage', (req ,res, next)=>{
  debugger
  Messages.find(req.body)
    .then((message)=>{
      res.status(200).json(message);
    })
    .catch(error =>{
      console.log('This is the invalid field ->', error)
    })
})

module.exports = router;