const express = require('express');
const router  = express.Router();
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message')

router.get('myconversations', (req, res, next) => {
  debugger

  const userId = req.body.userId;

  Conversation.find({participants: ObjectId(`${userId}`)}).sort({updated_at: -1})
    .then(response =>{
      res.json({response})
    })
    .catch(error=>{
      console.log(error);
    })

})

module.exports = router;