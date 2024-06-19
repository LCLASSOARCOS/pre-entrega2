
//Nos conectamos a MongoAtlas por medio de mongoose: 

import mongoose from "mongoose";
//const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aimyluz:coderhouse@cluster0.5qf0kec.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0")
  .then(()=> console.log("Conectados a la BD!"))
  .catch((error)=> console.log("Tenemos un error vamos a morir: ", error))

