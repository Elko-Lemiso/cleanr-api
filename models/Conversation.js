const mongoose = require('mongoose');
const {ObjectId, Date } = require('mongoose');
const Schema = mongoose.Schema;

const converstationSchema = new Schema({
  jobId: {type: Schema.ObjectId, ref: 'Job'},
  participants: [{type: Schema.ObjectId , ref: 'User'},],
  messages: [{type: Schema.ObjectId, ref: 'Message'}]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const Message = mongoose.model('Conversation', converstationSchema, 'conversations');


module.exports = Message;