const express=require("express")
const { connection } = require("./config/db.js")
const { carRouter } = require("./route/car.route.js")
require("dotenv").config()
const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"Welcome to Car Parking...."})
})


app.use("/car",carRouter)

app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log("Database connected!")
    } catch (error) {
        console.log("Database not connected!")
        console.error(error)
    }

    console.log(`Server is running on port : ${process.env.port}`)
})