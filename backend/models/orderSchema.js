const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   price: {
      type: Number,
   },
   orderDate: {
      type: Date,
      default: Date.now,
      immutable: true,
   },
   deliveryDate: {
      type: Date,
   },
   status: {
      type: String,
      enum: ['booked', 'under MW', 'under stitching', 'finishing work', 'pending', 'delivered'],
      default: 'booked'
   },
   advance: {
      type: Number,
      required: true,
   },
   note: {
      type: String
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
      required: true,
   },
   customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
   },
}, { timestamps: true });

const Orders = mongoose.model('Orders', orderSchema, 'orders');

module.exports = Orders;
