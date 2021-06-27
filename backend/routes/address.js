const router = require("express").Router();
const Address = require("../models/address");
const axios = require("axios");

let add = 0;
let update = 0;

// GET tally to see how may time add and update has been called:
router.get("/tally", (req, res) => {
  res.json({
    addAPI: add,
    updateAPI: update,
  });
});

// GET addresses to list all address:
router.get("/addresses", async (req, res) => {
  try {
    let addresses = await Address.find();

    res.json({
      success: true,
      addresses: addresses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET addresses to list all address:
router.get("/address/:id", async (req, res) => {
  try {
    let address = await Address.findOne({ _id: req.params.id });
    res.json({
      success: true,
      address,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// add new address
router.post("/addresses", async (req, res) => {
  try {
    let address = new Address();
    address.firstName = req.body.firstName;
    address.lastName = req.body.lastName;
    address.country = req.body.country;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.state = req.body.state;
    address.pinCode = req.body.pinCode;
    address.phoneNumber = req.body.phoneNumber;

    await address.save();
    add++;
    res.json({
      success: true,
      address: address,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//PUT Method to update person address
router.put("/addresses/:id", async (req, res) => {
  try {
    let foundAddress = await Address.findOne({ _id: req.params.id });

    if (foundAddress) {
      if (req.body.firstName) foundAddress.firstName = req.body.firstName;
      if (req.body.lastName) foundAddress.lastName = req.body.lastName;
      if (req.body.country) foundAddress.country = req.body.country;
      if (req.body.streetAddress)
        foundAddress.streetAddress = req.body.streetAddress;
      if (req.body.city) foundAddress.city = req.body.city;
      if (req.body.state) foundAddress.state = req.body.state;
      if (req.body.pinCode) foundAddress.pinCode = req.body.pinCode;
      if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;

      await foundAddress.save();
      update++;
      res.json({
        success: true,
        address: foundAddress,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// get list of all contries
router.get("/countries", async (req, res) => {
  try {
    let response = await axios.get("https://restcountries.eu/rest/v2/all");

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
