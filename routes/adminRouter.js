const express = require("express");
const router = express.Router();
const Admin = require("../model/admin")

router.post("/register", async(req, res) => {

const newadmin = new Admin({name : req.body.name  , email : req.body.email ,password : req.body.password})

try {
  const admin = await newadmin.save()
    res.send("Admin registered succesfully")
} catch (error) {
  return res.status(400).json({ error });
}

});



router.post("/login",(req,res) => {

  const {email , password} = req.body

 try {
  const admin = Admin.findone({email : email ,password : password})
   if(admin) {
    res.send(admin)
   }
   else{
    return res.status(400).json({message : 'Login failed'});
   }
 }catch (error) {
    return res.status(400).json({ error});
 }


});

module.exports=router
