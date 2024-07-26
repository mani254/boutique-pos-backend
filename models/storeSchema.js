const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   properator: {
      type: String,
      required: true
   },
   phone: {
      type: Number,
      required: true
   },
   landLine: {
      type: Number,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   status: {
      type: Boolean,
      required: true,
      default: true
   }
}, { timestamps: true });

const Stores = mongoose.model('Stores', storeSchema, 'stores');

module.exports = Stores;
