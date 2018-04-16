const appConfig = require('../../config.js');
const crypto = require('crypto');
const express = require('express')
const mailgun = require('mailgun-js')({
  apiKey: 'key-42f033539bf209da3741a2b2e85b56e1',
  domain: 'sandbox3c22427a0af54707a099b8c38f36e347.mailgun.org',
});
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../../models/user.js')

const router= express.Router()

mongoose.Promise = global.Promise

router.post('/login', async (req,res)=>{
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();

  // if they exist, they'll have a username, so add that to our body
  if (foundUser) { req.body.username = foundUser.username; }
  passport.authenticate('local')(req,res,() =>{
    if (req.user){
      return res.send(JSON.stringify(req.user))
    }
    return res.send(JSON.stringify({ error: 'There was an error logging in' }));
  })
})

// GET to /checksession
router.get('/checksession', (req, res) => {
  if (req.user) {
    return res.send(JSON.stringify(req.user));
  }
  return res.send(JSON.stringify({}));
});

router.get('/logout',(req,res)=>{
  req.logout();
  return res.send(JSON.stringify(req.user));
})


router.post('/register', async (req,res,next) =>{
  const newUser= new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })

  User.register(newUser,req.body.password,async(err)=>{
    // First, check and make sure the email doesn't already exist
    const query = User.findOne({ email: req.body.email });
    const foundUser = await query.exec();
    if (foundUser) { return res.send(JSON.stringify({ error: 'Email or username already exists' })); }
    if (!foundUser) {
      if (err) {
        return res.send(JSON.stringify({error: err}))
      }
      return passport.authenticate('local')(req, res, () => {
        if (req.user) {
          return res.send(JSON.stringify(user));
        }
        return res.send(JSON.stringify({error: 'There was an error'}))
      })
    }
  })
})


// POST to saveresethash
router.post('/saveresethash', async (req, res) => {
  let result;
  try {
    // check and make sure the email exists
    const query = User.findOne({ email: req.body.email });
    const foundUser = await query.exec();

    console.log(foundUser)
    // If the user exists, save their password hash
    const timeInMs = Date.now();
    const hashString = `${req.body.email}${timeInMs}`;
    const secret = 'alongrandomstringshouldgohere';
    const hash = crypto.createHmac('sha256', secret)
      .update(hashString)
      .digest('hex');
    foundUser.passwordReset = hash;

    foundUser.save((err) => {
      if (err) { result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' })); }
      // Put together the email
      const emailData = {
        from: `CloseBrace <postmaster@${appConfig.mailgun.domain}>`,
        to: foundUser.email,
        subject: 'Reset Your Password',
        text: `A password reset has been requested for the MusicList account connected to this email address. If you made this request, please click the following link: https://musiclist.com/account/change-password/${foundUser.passwordReset} ... if you didn't make this request, feel free to ignore it!`,
        html: `<p>A password reset has been requested for the MusicList account connected to this email address. If you made this request, please click the following link: <a href="https://musiclist.com/account/change-password/${foundUser.passwordReset}&quot; target="_blank">https://musiclist.com/account/change-password/${foundUser.passwordReset}</a>.</p><p>If you didn't make this request, feel free to ignore it!</p>`,
      };
      // Send it
      mailgun.messages().send(emailData, (error, body) => {
        if (error || !body) {
          result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to send the email. Please try again.' }));
        } else {
          result = res.send(JSON.stringify({ success: true }));
        }
      });
    });
  } catch (err) {
    // if the user doesn't exist, error out
    result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' }));
  }
  return result;
});

module.exports=router
