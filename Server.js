const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config()

const app = express();
//Connect to DataBase
mongoose.connect(process.env.MONGO_URI,
  {useNewUrlParser: true, useUnifiedTopology: true},
  ()=>{
      console.log('connected to Database');
});
//Body-Parser Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//GET :  RETURN ALL USERS 
app.get('/', (req, res) => {
  User.find({},(err,users)=>{
    if(err){
      res.status(404)
    }
    res.json(users)
  })
})
//POST :  ADD A NEW USER TO THE DATABASE 
app.post('/', (req, res) => {
  let  user = new User(req.body)
  user.save()
  res.status(201).json(user)
})
//PUT : EDIT A USER BY ID 
app.put('/:userId', (req, res) => {
  User.findById(req.params.userId, (err,user)=>{
    user.name = req.body.name
    user.age = req.body.age
    user.email = req.body.email
    user.save()
    res.json(user)
  })
})
//DELETE : REMOVE A USER BY ID 
app.delete('/:userId', (req, res) => {
  User.findById(req.params.userId, (err,user)=>{
    user.remove(err =>{
      if(err){
        res.status(500).send(err)
      }
      res.status(204).send('User Removed')
    })
  })
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))