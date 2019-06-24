const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const keys = require("../config/keys");
const client = require("twilio")(keys.twilioAccountSid, keys.twilioAuthToken);

exports.bookVehicle = (req, res) => {
  const bookVehicle = new Booking({
    from: req.body.from,
    to: req.body.to,
    address: req.body.address,
    date: req.body.date,
    time: req.body.time,
    seats: req.body.seats,
    type: req.body.type
  });
  client.messages
    .create({
      body: `from: ${req.body.from} to: ${req.body.to} Address: ${
        req.body.address
      } Seats: ${req.body.seats}`,
      from: "+12055258010",
      to: "+923051098103"
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log("twilio err", err));
  bookVehicle
    .save()
    .then(booking => res.status(201).json(booking))
    .catch(err => console.log(`ERROR From adding vehicle ${err}`));
};

exports.getVehicle = (req, res) => {
  Vehicle.find()
    .then(vehicle => res.json(vehicle))
    .catch(err => console.log(err));
};
