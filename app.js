const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser")

const userRoute = require("./routes/user.routes");
const blogRoute = require("./routes/blog.route")

//MongoDB Connection
mongoose
.connect('mongodb+srv://dlejan993:WwZcMJlcV549OJuO@cluster0.yg9zxu6.mongodb.net/spanishblogs')
.then( x =>{
    console.log('connected to mongo : ' + x.connections[0].name)
})
.catch(err =>{
    console.error('Error connecting', err.reason)
})

// connecting the front end to backend
app.use(cors({
    origin: 'http://localhost:5173',
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/user", userRoute)
app.use("/blog", blogRoute)

// tests of the server is up and running 
app.get('/',(req,res)=>{
    res.send('Hello')
})


app.listen(3000);