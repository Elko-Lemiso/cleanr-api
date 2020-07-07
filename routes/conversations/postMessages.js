const express = require('express');
const router  = express.Router();
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message')

router.post('/postmessage', (req ,res, next)=>{
  const conversationId = req.body.conversationId;

  const newMessage = {
    message: req.body.message,
    userType: req.body.userType,
    from: req.body.from,
    jobId: req.body.jobId 
  }

  Message.create(newMessage)
    .then((message)=>{
      return Conversation.findByIdAndUpdate(conversationId, { $push: { messages: message }}, {new: true})
        .populate('messages')
        .then((conversation)=>{
          res.status(200).json({conversation});
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