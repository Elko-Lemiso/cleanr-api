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
  fieldname: { type: String, default: 'basic-avatar'}, 
  filename: { type: String, default: 'basic-avatar'},
  originalname: { type: String, default: 'basic-avatar'},
  path: { type: String, default: 'https://res.cloudinary.com/dconurgxl/image/upload/v1593453874/avatar-icon-vector_zhcqk3.jpg'}, 
});

const addressSchema = new Schema({
  street: { type: String, required: [true, 'Street is required.']}, 
  houseNr: { type: Number, required: [true, 'House number is required.']},
  houseNrAddition: { type: String},
  zipCode: { type: String, required: [true, 'Zip code is required.']},
  city: { type: String, required: [true, 'City is required.']},
  long: {type: Number},
  lat: {type: Number}
})

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
  address: addressSchema,
  profilePicture: pictureSchema,
  bio: {type: String},
  telNr: {type: String},
  chamberOfCommerceNr: {type: Number},
  jobsUploaded: [{type: Schema.ObjectId , ref: 'Job' }],
  moneySpend: [moneySpendSchema],
  jobsTaken: [{type: Schema.ObjectId , ref: 'Job' }],
  moneyEarned: [moneyMadeSchema],
  reviewsWritten: [{type: Schema.ObjectId , ref: 'UserReview' }],
  reviewsReceived: [{type: Schema.ObjectId , ref: 'UserReview' }],
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;