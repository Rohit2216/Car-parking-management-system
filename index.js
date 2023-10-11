const express=require("express")
const { connection } = require("./config/db.js")
const { carRouter } = require("./route/car.route.js")
require("dotenv").config()
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors")

const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"Welcome to Car Parking...."})
})


app.use("/car",carRouter)


const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Car Parking System API Documentation',
        version: '1.0.0',
        description: 'API documentation for Car Parking  System application',
      },
      servers: [
        {
          url: `https://carparking-1lq7.onrender.com/`, // Replace with your server URL
          description: 'Development server',
        },
      ],
    },
    apis: ['./controllers/*.js'], // Path to your API route files
  };
  
  
  const specs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


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