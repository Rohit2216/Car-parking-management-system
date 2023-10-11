# Car Parking Management System API

This API provides endpoints for managing cars in a parking system.

- [Swagger documentation Link](https://carparking-1lq7.onrender.com/api-docs/)
## Endpoints

### Park a Car

#### `POST /park`

Parks a car in the parking lot.

**Request Body:**

```json
{
  "carNumber": "ABC1234" // Car number (minimum 6 characters)
}
```

**Response:**

- **201 Created**

```json
{
  "parkingInfo": "You have parked your car with number ABC1234 in slot number 1."
}
```

- **400 Bad Request**

```json
{
  "message": "Car with the same number is already parked"
}
```

```json
{
  "message": "Parking slot is not available"
}
```

#### Unpark a Car

#### `DELETE /unpark/{slotNumber}`

Unparks a car based on its slot number.

**Response:**

- **200 OK**

```json
{
  "message": "Car with slot number {slotNumber} has been unparked"
}
```

- **404 Not Found**

```json
{
  "message": "Car not found at the specified slot number"
}
```

#### Get Car Slot Information

#### `GET /getCar/{input}`

Retrieves car information based on its car number or slot number.

**Response:**

- **200 OK**

```json
{
  "carNumber": "ABC1234",
  "slotNumber": 1
}
```

- **404 Not Found**

```json
{
  "message": "Car or slot not found for the given input"
}
```

## Validation Rules

- `carNumber`: Must be a string with a minimum length of 6 characters.

## Error Handling

- **400 Bad Request**: When the client sends invalid data or requests are not allowed due to current conditions (e.g., parking slot full).
- **404 Not Found**: When a resource is not found (e.g., trying to unpark a car that doesn't exist).
- **500 Internal Server Error**: For unexpected server-side errors.

For detailed error responses, refer to the specific endpoint documentation above.

## Setup and Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the server: `npm run server`

## Technologies Used

- Node.js
- Express.js
- MongoDB (Assuming MongoDB is used as the database)

## Contributors

- [Your Name](#) - Main Developer

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.