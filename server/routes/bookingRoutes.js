const express = require("express");

const bookingControllers = require("../controllers/bookingControllers");

const router = express.Router();

router.post("/book", bookingControllers.bookVehicle);
router.get("/vehicles", bookingControllers.getVehicle);

module.exports = router;
