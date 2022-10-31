const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

require("dotenv").config({path:"./config.env"})
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

// MongodB Connection
const conn = require('./db/connection.js')

// using routes 
app.use(require('./routes/route'));
app.use(express.static(path.join(__dirname + "/public")))

conn.then(db=>{
    if(!db)return process.exit(1);

    // listen to sever if db is connected
    app.listen(port, ()=>{
        console.log(`Server is running at port ${port}`);
    })

    app.on('error',err=>console.log("Fail To Connect with Server: "+err))

}).catch(err=>{
    console.log("Connection Failed: "+err)
})


