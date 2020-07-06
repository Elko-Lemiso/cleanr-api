const express = require('express');
const router  = express.Router();
const Chat = require('../../models/Chat')

router.post('/postmessage', (req ,res, next)=>{
  debugger
  Chat.create(req.body)
    .then((message)=>{
      res.status(200).json(message);
    })
    .catch(error =>{
      console.log('This is the invalid field ->', error)
    })
})

module.exports = router;