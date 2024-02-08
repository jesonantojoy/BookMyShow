const mongoose = require("mongoose")
//Register
const UserSchema = mongoose.Schema({
    name:{
        require:true,
        type:String,
    },
    email:{
        require:true,
        type:String,
    },
    password:{
        require: true,
        type: String,
    },
});

module.exports=mongoose.model("users",UserSchema)