const mongoose =  require('mongoose')
console.log(process.env.mongodb_url);

mongoose.connect(process.env.mongodb_url ,{
    
});

const isconnection = mongoose.connection
isconnection.on("connected",()=>{
    console.log("connection sucessfully");
})
isconnection.on("error",(err)=>{
 console.error("mongodb connection error:",err)
})
