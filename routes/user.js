const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const user_models = require('../models/user_models');


//Get a User
router.get('/get', async (req,res) =>{
    try {
        const obj = await user_models.find({});
        res.json(obj);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})


//Create a User
router.post('/create', async (req,res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new user_models({ username : req.body.username, password : hashedPassword });
        
        // Push to a database
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch (err) {
        res.status(400).json({message : err.message});
    }
});

//Validate a user
router.post('/login', async(req,res) =>{
    // Check user is in database
    const user = await user_models.where("username").equals(req.body.username);
    if (user.length === 0){
       return res.status(400).json({"success" : "false"});
    }
    try {
       if(await bcrypt.compare(req.body.password, user[0].password)){
            res.json({
                "success" : "true"
            })
       }else{
            res.json({
                "success" : "false"
            })
       }
    } catch (error) {
        res.status(500).json({message : error.message });
    }
});

//Delete a user
router.delete('/remove/:id', async (req,res) =>{
    const { id } = req.params;
    try {
        res.status(200).json(await user_models.deleteOne({ '_id' : id}));
    } catch(error) {
        res.status(500).json({message : error.message});
    }
})





module.exports = router;