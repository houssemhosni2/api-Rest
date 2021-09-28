const mongoose=require('mongoose');
//Create a user having this prototype:
const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String
    }
}); 

module.exports = mongoose.model('Users',UserSchema);