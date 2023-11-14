const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser")

const userRoute = require("./routes/user.routes");
const blogRoute = require("./routes/blog.route");

const PORT = process.env.PORT || 3000;

//MongoDB Connection
mongoose
.connect('mongodb+srv://dlejan993:WwZcMJlcV549OJuO@cluster0.yg9zxu6.mongodb.net/spanishblogs')
.then( x =>{
    console.log('connected to mongo : ' + x.connections[0].name)
})
.catch(err =>{
    console.error('Error connecting', err.reason)
})

let corsOptions = {
    origin: "https://the-world-de-espanol.onrender.com",
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Access-Control-Allow-Origin"],
    credentials: "true",
    methods: ["GET", "POST"]
}

// connecting the front end to backend
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/user", userRoute)
app.use("/blog", blogRoute)

// tests of the server is up and running 
app.get('/',(req,res)=>{
    res.send('Hello')
})


app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
