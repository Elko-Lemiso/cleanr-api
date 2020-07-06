const mongoose = require('mongoose');
const {ObjectId, Date } = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  message: {type: String, required: [true, 'Message is required.']},
  userType: {type: String, enum :['client','cleaner'], required: [true, 'User type is required.']},
  from: {type: Schema.ObjectId, required: [true, 'Receiver is required.']},
  to: {type: Schema.ObjectId, required: [true, 'Sender is required.']},
  jobId: {type: String, required: [true, 'The job ID is required.']},
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const Chat = mongoose.model('Chat', chatSchema, 'chats');


module.exports = Chat;