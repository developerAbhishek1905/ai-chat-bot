const mongoose = require('mongoose');
const massageSchema = mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
ref:'auth',},
chat:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'chat',
},
content:{
    type:String,
    required:true,
},
role:{
    type:String,
    enum:['user','model',"system"],
    default:'user',
}


}
,{timestamps:true}
)

const massageModel = mongoose.model("massage",massageSchema);

module.exports = massageModel;