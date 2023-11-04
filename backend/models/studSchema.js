const mongoose= require("mongoose");
const studSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    profile:{
        type:String
    }
});
const students=new mongoose.model("students",studSchema);
module.exports=students;