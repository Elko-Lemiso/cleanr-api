const express = require('express');
const router  = express.Router();
const Message = require('../../models/Message')

router.post('/postmessage', (req ,res, next)=>{
  const newMessage = {
    message: req.body.message,
    userType: req.body.userType,
    from: req.body.from,
    jobId: req.body.jobId,
    conversationId: req.body.conversationId
  }

  Message.find()
    .then((message)=>{
      res.status(200).json(message);
    })
    .catch(error =>{
      console.log('This is the invalid field ->', error)
    })
})

module.exports = router;