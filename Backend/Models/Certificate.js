const mongoose = require("mongoose");
const certificateSchema = new mongoose.Schema({
    Empid: { type: String
    },

    certificateName: {
        type: String,
        required: true
    },
    issuingOrganization: {
        type: String,
        required: true
    },
    issueDate: {
        type: String,
        required: true
    }
    ,
    ExpireDate: {
        type: String,
        required: true
    },
    credentialID: {type:String,required: true},
    Status:{type:String,required: true}
 
},
{
    collection: "CertificateDetails",
  });
  mongoose.model("CertificateDetails", certificateSchema);