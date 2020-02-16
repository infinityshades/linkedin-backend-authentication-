const express = require('express');
const router = express.Router();
const userCollection = require ('../../model/userSchema');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');

//Get user by id
router.get('/:id', async ( req,res)=>{
    try{
        console.log('fetching Data');
        const users = await userCollection.findById(req.params.id);
        res.json(users);
    } catch (err){
        console.log (err);
        res.status(500).json(err);
    }
})

//Adding user to db
router.post('/', async (req,res)=>{
    try{
        console.log('adding user to db');
        const newUser = await userCollection.create(req.body);
        res.send(newUser);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Editing user data
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

//Deleting user from db
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

//Get all experience from a specific user
router.get('/:id/experiences', async (req,res)=>{
    try{
        console.log(`fetching user experiences`);
        const user = await userCollection.findById(req.params.id);
        res.json(user.experience);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Posting an experience to user
router.post('/:id/experience', async(req,res)=>{
    try{
        console.log(`Posting an experience to a user`);
        const newExperience = req.body
        const result = await userCollection.findByIdAndUpdate(req.params.id, 
            {$push:{experience: newExperience}}, {new:true});
            res.json(result);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Edit experience of user
router.put('/:id/experience/:expid', async(req,res)=>{
    try{
        delete req.body.createdAt
        delete req.body._id
        console.log('Editing Data');
        // const experienceId = mongoose.Types.ObjectId(req.params.expid);
        const edited = await userCollection.findOneAndUpdate({
            _id: req.params.id, 
            // 'experience._id': experienceId
            'experience._id' : ObjectId(req.params.expid) 
        },{
            'experience.$': req.body},
            {new:true})
        res.json(edited);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


//Remove experience
router.delete('/:id/experience/:expid', async(req,res)=>{
    try{
        console.log('removing experience');
        const experienceId = mongoose.Types.ObjectId(req.params.expid);
        const removed = await userCollection.findOneAndUpdate({
            _id: req.params.id,
        },{
            $pull:{experience:{_id: experienceId}}
        })
        if(removed){
            console.log(removed);
            res.send("removed");
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})
module.exports = router