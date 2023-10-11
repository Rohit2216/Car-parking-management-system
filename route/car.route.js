const express = require('express');
const carRouter = express.Router();
const { parkCar, unparkCar,getCarSlotInformation } = require('../controllers/car.controller');

// Route to park a car (assuming it's a POST request with carNumber in the request body)
carRouter.post('/park', parkCar);

// Route to unpark a car by slot number (assuming it's a DELETE request with slotNumber as a URL parameter)
carRouter.delete('/unpark/:slotNumber', unparkCar);

carRouter.get('/info/:input', getCarSlotInformation);


module.exports = {carRouter};
