const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../../models/user.js')

const router= express.Router()

mongoose.Promise = global.Promise

router.post('/register',(req,res,next)=>{
  const newUser= new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })

  User.register(newUser,req.body.password,(err,user)=>{
    if (err){
      return res.send(JSON.stringify({ error: err}))
    }
    return res.send(JSON.stringify(user))
  })
})

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

router.get('/logout',(req,res)=>{
  req.logout();
  return res.send(JSON.stringify(req.user));
})



module.exports=router