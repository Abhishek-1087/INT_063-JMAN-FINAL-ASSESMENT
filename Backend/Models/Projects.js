const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    Empid: { type: String
    },

    projectName: {
        type: String,
        required: true
    },
    majorSkill: {
        type: String,
        required: true
    },
    Status:{type:String,required: true}

},
{
    collection: "ProjectDetails",
  });
  mongoose.model("ProjectDetails", projectSchema);