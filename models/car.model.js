const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carNumber: {
        type: String,
        required: true,
        unique: true
    },
    slotNumber: {
        type: Number,
        unique: true
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = {Car};
