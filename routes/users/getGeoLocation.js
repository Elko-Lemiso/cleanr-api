require('dotenv').config();
const express = require('express');
const router  = express.Router();
const axios = require('axios');
const googleApiKey = process.env.GOOGLE_API_KEY;

router.get("/geolocation/:address", (req, res, next)=>{
  const address = req.params.address;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleApiKey}`)
  .then((response)=>{
    const geoLocation = response.data.results[0].geometry.location
    if(response){
      console.log(geoLocation);
      res.json({geoLocation});
    } else{
      res.status(401).json({errorMessage: 'Address not found'});
    }
  })
  .catch((error)=>{
    console.log(error);
  })
})

module.exports = router;

