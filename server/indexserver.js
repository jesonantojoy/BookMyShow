const express = require ("express")
const app =express()
const cors = require("cors")
const UserRoutes=require("../server/Routes/userRoutes")

require("dotenv").config()

const dbconfig = require("./config/dbconfig")
app.use(cors())

app.use(express.json())
app.use("/user",UserRoutes)


app.get("/",(req,res)=>{
    res .send("Api is Runing")
})



app.listen(7000,()=>{
    console.log("Working on port 7000");
})