const express = require('express');

const Profile = require('../models/profile');
const User = require('../models/user');

const app = express();


app.post('/user/:id/profile', async (req, res) => {

  const { form } = req.body;
  const { id } = req.params;

  const profile = {
    userId: id,
    firstName: form.first_name,
    lastName: form.last_name,
    email: form.email,
    zipcode: form.zip_code,
    streetAddress: form.street_address,
    city: form.city,
    phone: form.phone,
    workPhone: form.work_phone,
    annualIncome: form.annual_income,
    bedroomOptions: form.bedroom_options,
    numberOfOccupants: form.number_of_occupants,
  };
  
  const user =  await User.findById(id);
  user.isProfileFulFilled = true;
  try{
    const query = { userId: id};
    const options = { upsert: true };
    await Profile.findOneAndUpdate( query , profile , options );
    await user.save()
    res.status(200).send("Profile saved successfully");
  }catch( error ) {
    console.log(error, error);
    res.status(500).send();
  };
});


app.get('/user/:id/profile', async (req, res) => {

  const { id } = req.params;
  
  try{
    const profile = await Profile.findOne({
      userId: id
    })
    res.status(200).send(profile);
  }catch( error ) {
    console.log(error, error);
    res.status(500).send();
  };
});


module.exports = app;