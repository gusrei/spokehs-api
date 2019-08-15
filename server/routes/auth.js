const { isNil } = require('lodash');
const express = require('express');

const User = require('../models/user');

const app = express();


app.post('/signIn', async (req, res) => {

  const { username, password} = req.body;
  const user = await User.findOne( {
    username,
    password
  }).exec();

  user? signInUser(user) : throwBadCredentialsException();

  res.status(200).send(user);
});

app.post('/signOut', async (req, res) => {

  const { username } = req.body;
  const user = await User.findOne( {
    username,
  }).exec();

  user? singOutUser(user) : throwServerErrorException();

  res.status(200).send(user);
});

const  singOutUser = async user => {
  user.signedIn = false;
  await user.save();
}

const  signInUser = async user => {
  user.signedIn = true;
  await user.save();
}

const throwBadCredentialsException = () => {
  const error   = new Error();
  error.status  = 401;
  error.message = 'Invalid username or password'
  throw error;
}

const throwServerErrorException = () => {
  const error = new Error();
  error.status = 500;
  error.message = 'Server error'
  throw error;
}


// ************************** SignUp ****************************
const passwordsValidation = (password, password_confirmation) => {
  
  if( !password.length || !password_confirmation.length ){
    throwBadRequestException("Passwords can't be empty.");
  }
  
  if( !(password === password_confirmation) ){
    throwBadRequestException("Those passwords didn't match. Please try again.");
  }
};


const validateUniqueUser = async (username) => {

  const user = await User.findOne( {
    username
  }).exec();

  if( !isNil(user) ){
    throwBadRequestException("That user name is taken. Please try another.");
  } 
};

const throwBadRequestException = (message) => {
  const error   = new Error();
  error.status  = 400;
  error.message = message
  console.log({message})
  throw error;
}


const validateSignUp = async (username, password, password_confirmation) => {
  try{
    passwordsValidation(password, password_confirmation);
    await validateUniqueUser(username);
  }
  catch( error ) {
    if (error.status === 500) {
      error.message("Internal Server Error");
    }
    throw error
  }
}

const createUser = ( username, password ) => {
  const new_user = new User( {
    username: username,
    email   : username,
    password: password
  });
  
  new_user.save();   
}

app.post('/signUp', async (req, res) => {

  const {username, password, password_confirmation} = req.body;

  console.log("Request: ", req.body
  )

  // Validations
  await validateSignUp(username, password, password_confirmation)
  createUser(username, password)
  res.status(201).send();
});


module.exports = app;