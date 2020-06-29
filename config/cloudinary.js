const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
require('dotenv').config();
 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'cleanR',
      format: async (req, file) => {'png', 'jpg'}, 
      public_id: (req, file) => { 
          file.fieldname,
          file.filename, 
          file.originalname, 
          file.path 
        }
    },
  });

const uploadCloud = multer({ storage: storage });
 
module.exports = uploadCloud;