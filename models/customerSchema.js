const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
   number: {
      type: String,
      required: true,
      unique: true
   },
   name: {
      type: String,
      required: true
   }
}, { timestamps: true });


const Customers = mongoose.model('Customers', customerSchema, 'Customers');

module.exports = Customers;
