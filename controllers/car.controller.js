const { Car } = require('../models/car.model');

// const parkCar = async (req, res) => {
//     try {
//         const { carNumber } = req.body;
//         const existingCar = await Car.findOne({ carNumber });
//         if (existingCar) {
//             return res.status(400).json({ message: 'Car with the same number is already parked' });
//         }

//         const existingCarsCount = await Car.countDocuments();
//         const maxParkingSlots = 100;

//         if (existingCarsCount < maxParkingSlots) {
//             const slotNumber = existingCarsCount + 1; // Assign a slot number
//             const newCar = new Car({ carNumber, slotNumber });
//             await newCar.save();
//             res.status(201).json(newCar);
//         } else {
//             res.status(400).json({ message: 'Parking slot is not available' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


const parkCar = async (req, res) => {
    try {
        const { carNumber } = req.body;
        const existingCar = await Car.findOne({ carNumber });
        if (existingCar) {
            return res.status(400).json({ message: 'Car with the same number is already parked' });
        }

        const existingCarsCount = await Car.countDocuments();
        const maxParkingSlots = 100;

        if (existingCarsCount < maxParkingSlots) {
            const slotNumber = existingCarsCount + 1; // Assign a slot number
            const newCar = new Car({ carNumber, slotNumber });
            await newCar.save();
            res.status(201).json({
                // message: 'Car parked successfully',
                // slotNumber: newCar.slotNumber,
                parkingInfo: `You have parked your car in slot number ${newCar.slotNumber}.`
            });
        } else {
            res.status(400).json({ message: 'Parking slot is not available' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





const unparkCar = async (req, res) => {
    try {
        const { slotNumber } = req.params; // Assuming slotNumber is passed as a URL parameter
        const unparkedCar = await Car.findOneAndDelete({ slotNumber: parseInt(slotNumber) });

        if (unparkedCar) {
            // Decrement slot numbers of remaining parked cars with slot numbers greater than the unparked car
            await Car.updateMany({ slotNumber: { $gt: parseInt(slotNumber) } }, { $inc: { slotNumber: -1 } });
            res.status(200).json({ message: `Car with slot number ${slotNumber} has been unparked` });
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
    parkCar,
    unparkCar,
    getCarSlotInformation
};
