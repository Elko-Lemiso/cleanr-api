const express = require('express');
const router  = express.Router();
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message')

router.post('/startconversation', (req ,res, next)=>{

  const newConversation = {
    jobId: req.body.jobId,
    participants: [req.body.clientId, req.body.cleanerId],
    messages: []
  }

  const newMessage = {
    message: req.body.message,
    userType: req.body.userType,
    from: req.body.cleanerId,
    jobId: req.body.jobId
  }

  Message.create(newMessage)
    .then((message)=>{
      console.log(message);
        return Conversation.create({
          jobId: req.body.jobId,
          participants: [req.body.clientId, req.body.cleanerId],
          messages: [message._id]
        })
        .then((conversation)=>{
          console.log(conversation);
          res.status(200).json({conversation, message});
        })
        .catch(error =>{
          console.log('This is the invalid field ->', error)
        })
    })
    .catch(error =>{
      console.log('This is the invalid field ->', error)
    })

})

module.exports = router;