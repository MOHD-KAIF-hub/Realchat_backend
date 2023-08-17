const router = require('express').Router();
const User = require('../models/User');

// creating user
router.post('/', async(req, res)=> {
  try {
    const {name, email, password, picture} = req.body;
    console.log(req.body);
    const user = await User.create({name, email, password, picture});
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if(e.code == 11000){
      msg = "User already exists"
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg)
  }
})

// login user

router.post('/login', async(req, res)=> {
  try {
    const {email, password} = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = 'online';
    await user.save();
    res.status(200).json(user);
  } catch (e) {
      res.status(400).json(e.message)
  }
})
router.post('/contact',async(req,res)=>{

  try{
    const {name,email,message}=req.body;
    if(!name || !email || !message){
      return res.status(422).json({error:"Plz filled the form correctly"})
    }
    const UserContact=await User.findOne({email:email});
    if(UserContact)
    {
      const userMessage=await UserContact.addMessage(name,email,message);
      await UserContact.save();
      res.status(201).json({message:"User contact succesfully"});
    }
  }
  catch(err){
    cosole.log(err);
  }
});


module.exports = router