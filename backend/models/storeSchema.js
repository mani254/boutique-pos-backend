const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
   storeName: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true,
   },
   admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admins'
   }
}, { timestamps: true });

const Stores = mongoose.model('Stores', storeSchema, 'stores');

module.exports = Stores;
