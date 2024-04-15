const mongoose = require('mongoose');

const certificateData = new  mongoose.Schema({
    userId:{
        type:String,
        // unique:true
    },
    skills:String,
    rating:Number
    
},
{
    collection: "SkillsDetails",
  } 
);

mongoose.model("SkillsDetails", certificateData);


