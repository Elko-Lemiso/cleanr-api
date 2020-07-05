const mongoose = require('mongoose');
const { ObjectId, Date } = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: { type: String}, 
    houseNr: { type: Number},
    houseNrAddition: { type: String, default: ''},
    zipCode: { type: String},
    city: { type: String},
    long: {type: Number, default: ''},
    lat: {type: Number, default: ''}
  })

const pictureSchema = new Schema({
fieldname: { type: String, default: 'basic-avatar'}, 
filename: { type: String, default: 'basic-avatar'},
originalname: { type: String, default: 'basic-avatar'},
path: { type: String }, 
});

const jobSchema = new Schema({
  creator: {type: Schema.ObjectId , ref: 'User'},
  title: {type: String},
  description: {type: String},
  applicants : [{type: Schema.ObjectId , ref: 'User' }],
  cleanerId: {type: Schema.ObjectId , ref: 'User'},
  rate : {type : Number},
  address: addressSchema,
  images:[pictureSchema],
  dueDate : {type : Date},
  status : {type: String},
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const Job = mongoose.model('job', jobSchema, 'jobs');

module.exports = Job;