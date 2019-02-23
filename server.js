require('dotenv').config();
const path = require('path');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const express = require("express");
const routes = require('./routes/api');
const authRoutes = require('./routes/authenticate');
const favoriteRoute = require('./routes/favoriteRoute');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const certOptions = {
  key: fs.readFileSync(path.resolve('./ssl/server.key')),
  cert: fs.readFileSync(path.resolve('./ssl/server.crt'))
 }


//set up an express app
const app = express();
const server = https.createServer(certOptions, app);



// app.get("/city", (req, res) => res.send("HELLO WORLD"));

//initialize body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/itinerary/:id', express.static('uploads'));
app.use('/activity/:id', express.static('uploads'));

//const mongoDB = process.env.db_url;
const mongoDB = "mongodb://aputyera:Marthica7@ds145474.mlab.com:45474/mytineraryapp";
// const mongoDB ='mongodb://aputyera:MickeyMouse27@ds145474.mlab.com:45474/mytineraryapp';
mongoose.connect(mongoDB,
{useNewUrlParser: true}).then(()=>{
    console.log("mongoDB connected..")
}).catch(err => {
    console.error(err,'Database connection error')
  });
  
mongoose.set ("useCreateIndex", true);

  //initialize routes
app.use("/api", routes);
app.use("/auth", authRoutes);
app.use("/",favoriteRoute);

// set up and listen for requests
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));


