const express = require('express');
const router = express.Router();
const userCollection = require ('../../model/userSchema');

router.get('/', async ( req,res)=>{
    try{
        const users = await userCollection.find();
        res.json(users);
    } catch (err){
        console.log (err);
        res.status(500).json(err);
    }
})

router.post('/', async (req,res)=>{
    try{
        console.log('fetching Data');
        const newUser = await userCollection.create(req.body);
        res.send(newUser);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/:id', async( req,res)=>{
    try{
        console.log(`editing data`);
        const edited = await userCollection.findByIdAndUpdate(req.params.id,{...req.body},{new: true});
        res.json(edited);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        console.log('deleting user');
        const removed = await userCollection.findByIdAndDelete(req.params.id);
        res.json('removed');
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    })
module.exports = router