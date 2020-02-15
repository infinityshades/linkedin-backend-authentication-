const express = require ('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const userServices = require('./src/services/users')
dotenv.config()


mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(db => console.log('mongodb connected'), error => console.log('MongoDb failed to connect', error))

const port = process.env.PORT || 9090
app.listen(port, ()=>{
    console.log(`server is launched at launchpad ${port}`)
})

app.use(express.json())
app.use('/users', userServices);