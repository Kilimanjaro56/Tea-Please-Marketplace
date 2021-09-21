const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{type:String, required: true},
    password:{type:String, required: true},
    email:{type:String, required: true},
    bio:{type:String, default: 'Tell us about yourself...'},
    favourites:{type:Array},
},
{timestamps: true},
);
module.exports = mongoose.model("User", UserSchema);
