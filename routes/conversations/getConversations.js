const express = require('express');
const router  = express.Router();
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message')
const User = require('../../models/User')

router.get('/myconversations', (req, res, next) => {
  const userId = req.query.userId;

  Conversation.find({participants: userId}).sort({created_at: -1})
    .populate('participants')
    .populate('jobId')
    .populate('messages')
    .then(response =>{
      res.json({response})
    })
    .catch(error=>{
      console.log(error);
    })
})

router.get('/myconversationmessages', (req, res, next) => {
  const conversationId = req.query.conversationId;
  
  Conversation.findOne({_id: conversationId})
    .populate('participants')
    .populate('jobId')
    .populate('messages')
    .then(response =>{
      res.json({response})
    })
    .catch(error=>{
      console.log(error);
    })
})

module.exports = router;