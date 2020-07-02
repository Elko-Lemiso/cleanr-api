const mongoose = require('mongoose');
const { ObjectId, Date } = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: { type: String, required: [true, 'Street is required.']}, 
    houseNr: { type: Number, required: [true, 'House number is required.']},
    houseNrAddition: { type: String, default: ''},
    zipCode: { type: String, required: [true, 'Zip code is required.']},
    city: { type: String, required: [true, 'City is required.']},
    long: {type: Number, default: ''},
    lat: {type: Number, default: ''}
  })

const pictureSchema = new Schema({
fieldname: { type: String, default: 'basic-avatar'}, 
filename: { type: String, default: 'basic-avatar'},
originalname: { type: String, default: 'basic-avatar'},
path: { type: String, default: 'https://res.cloudinary.com/dconurgxl/image/upload/v1593453874/avatar-icon-vector_zhcqk3.jpg'}, 
});

const jobSchema = new Schema({
  title: {type: String, required: [true, 'Title is required']},
  description: {type: String, required: [true, 'description is required.']},
  applicants : [{type: Schema.ObjectId , ref: 'User' }],
  cleanerId: {type: Schema.ObjectId , ref: 'User'},
  rate : {type : Number, required : [true, "You need to indicate a rate"]},
  address: addressSchema,
  images:[pictureSchema],
  dueDate : {type : Date}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const Job = mongoose.model('job', jobSchema, 'jobs');

module.exports = Job;