const { Car } = require('../models/car.model');
const { check, validationResult } = require('express-validator');

const parkCarValidationRules = [
    // Validate carNumber field with a minimum length of 6 characters
    check('carNumber').isString().notEmpty().isLength({ min: 6 }),
];




const parkCar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({"msg":"Car Number length at least 6 characters"});
    }
    try {
        const { carNumber } = req.body; // Extract carNumber from the request body

        // Check if the car with the given number is already parked
        const existingCar = await Car.findOne({ carNumber });
        if (existingCar) {
            return res.status(400).json({ message: 'Car with the same number is already parked' });
        }

        // Get the maximum slot number and the total number of parking slots
        const maxSlotNumber = await Car.findOne().sort({ slotNumber: -1 }).select('slotNumber');
        const totalParkingSlots = 100; // Total number of parking slots

        // Check if there are available parking slots
        if (maxSlotNumber && maxSlotNumber.slotNumber >= totalParkingSlots) {
            return res.status(400).json({ message: 'Parking slot is not available' });
        }

        const newSlotNumber = maxSlotNumber ? maxSlotNumber.slotNumber + 1 : 1;

        const newCar = new Car({ carNumber, slotNumber: newSlotNumber }); // Assign carNumber to the new car
        await newCar.save();

        res.status(201).json({
            parkingInfo: `You have parked your car with number ${carNumber} in slot number ${newCar.slotNumber}.`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const unparkCar = async (req, res) => {
    try {
        const { slotNumber } = req.params;
        const unparkedCar = await Car.findOneAndDelete({ slotNumber: parseInt(slotNumber) });

        if (unparkedCar) {
            // Get the maximum slot number after unparking
            const maxSlotNumber = await Car.findOne().sort({ slotNumber: -1 }).select('slotNumber');

            res.status(200).json({
                message: `Car with slot number ${slotNumber} has been unparked`,
                // vacantSlotNumber: slotNumber, // Return the vacant slot number
                // maxSlotNumber: maxSlotNumber ? maxSlotNumber.slotNumber : 0 // Return the new maximum slot number
            });
        } else {
            res.status(404).json({ message: 'Car not found at the specified slot number' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const getCarSlotInformation = async (req, res) => {
    try {
        const { input } = req.params; // Assuming input (car number or slot number) is passed as a URL parameter
        const query = isNaN(input) // Check if input is not a number (car number) 
            ? { carNumber: input } // If not a number, search by car number
            : { slotNumber: parseInt(input) }; // If a number, search by slot number

        const car = await Car.findOne(query);

        if (car) {
            res.status(200).json({ carNumber: car.carNumber, slotNumber: car.slotNumber });
        } else {
            res.status(404).json({ message: 'Car or slot not found for the given input' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    parkCar: [...parkCarValidationRules, parkCar],
    unparkCar,
    getCarSlotInformation
};
