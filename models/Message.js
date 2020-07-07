const mongoose = require('mongoose');
const {ObjectId, Date } = require('mongoose');
const Schema = mongoose.Schema;


const messagesSchema = new Schema({
  message: {type: String},
  userType: {type: String, enum: ['client','cleaner']},
  from: {type: Schema.ObjectId , ref: 'User'},
  jobId: {type: Schema.ObjectId, ref: 'Job'},
  // conversation: {type: Schema.ObjectId, ref: 'Converstion'}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const Message = mongoose.model('Message', messagesSchema, 'messages');


module.exports = Message;