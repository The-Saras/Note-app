var mongoose=require("mongoose");
const url="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo= async ()=>{
    mongoose.connect(url,()=>{
        console.log("connected!!")
    })
}

module.exports = connectToMongo;