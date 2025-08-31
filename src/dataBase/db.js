const mongoose = require('mongoose')

async function connetToDB (){
    try{
        await mongoose.connect(process.env.MONGOOSE_URI)
        .then(()=>{console.log("connected to data base")})
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connetToDB