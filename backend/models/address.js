const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  streetAddress: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: Number,
  },
  phoneNumber: String,
});

module.exports = mongoose.model("Address", AddressSchema);
