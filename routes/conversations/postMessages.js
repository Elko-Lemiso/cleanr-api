const express = require('express');
const router  = express.Router();
const Message = require('../../models/Message')

router.post('/postmessage', (req ,res, next)=>{
  debugger
  const newMessage = {
    message: req.body.message,
    userType: req.body.userType,
    from: req.body.userId,
    jobId: req.body.jobId,
    conversation: req.body.conversationId
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