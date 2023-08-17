
const mongoose =require("mongoose");
const dotenv =require("dotenv");
dotenv.config();
const CONNECTION=process.env.MONGODB_CONNECTION;
mongoose.connect(CONNECTION,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(`{err} Did not connected`);
})
