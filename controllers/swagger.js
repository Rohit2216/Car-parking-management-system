/**
 * @swagger
 * /car/park:
 *   post:
 *     summary: Park a car
 *     description: Park a car and assign a slot number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carNumber:
 *                 type: string
 *                 minLength: 6
 *             example:
 *               carNumber: "AB123CD"
 *     responses:
 *       201:
 *         description: Car parked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 parkingInfo:
 *                   type: string
 *                   description: Information about the parked car
 *                   example: "You have parked your car in slot number 1."
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: "Vehicle number must be at least 6 characters long."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal Server Error"
 */


/**
 * @swagger
 * /car/unpark/{slotNumber}:
 *   delete:
 *     summary: Unpark a car by slot number
 *     description: Unpark a car based on its slot number and update slot numbers of remaining parked cars.
 *     parameters:
 *       - in: path
 *         name: slotNumber
 *         required: true
 *         description: Slot number of the car to be unparked
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Car has been successfully unparked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Car with slot number 1 has been unparked."
 *       404:
 *         description: Car not found at the specified slot number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Car not found at slot number 1."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal Server Error"
 */



/**
 * @swagger
 * /car/info/{input}:
 *   get:
 *     summary: Get car information by car number or slot number
 *     description: Retrieve car information based on its car number or slot number.
 *     parameters:
 *       - in: path
 *         name: input
 *         required: true
 *         description: Car number or slot number of the car to retrieve information
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 carNumber:
 *                   type: string
 *                   description: Car number (if found)
 *                   example: "AB123CD"
 *                 slotNumber:
 *                   type: integer
 *                   description: Slot number (if found)
 *                   example: 1
 *       404:
 *         description: Car or slot not found for the given input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Car or slot not found for input AB123CD."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal Server Error"
 */
