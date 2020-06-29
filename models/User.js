const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moneyMadeSchema = new Schema({
  amount: {type: Number}
}, {
  timestamps: { createdAt: "created_at"}
})

const moneySpendSchema = new Schema({
  amount: {type: Number}
}, {
  timestamps: { createdAt: "created_at"}
})

const pictureSchema = new Schema({
  fieldname: { type: String}, 
  filename: { type: String},
  originalname: { type: String},
  path: { type: String}, 
});

const userSchema = new Schema({
  firstname: {type: String, required: [true, 'Firstname is required.']},
  lastname: {type: String, required: [true, 'Lastname is required.']},
  email: {
    type: String,
    required: [true, 'Email is required.'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {type: String, required: [true, 'Password is required.']},
  userType: {type: String, enum :['client','cleaner'], default: 'client', required: [true, 'User type is required.']},
  profilePicture : pictureSchema,
  bio: {type: String},
  chamberOfCommerceNr: {type: Number},
  jobsUploaded: {type: Number},
  moneySpend: [moneySpendSchema],
  jobsTaken: {type: Number},
  moneyEarned: [moneyMadeSchema],
  reviewsWritten: [{type: Schema.ObjectId , ref: 'UserReview' }],
  reviewsReceived: [{type: Schema.ObjectId , ref: 'UserReview' }],
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;