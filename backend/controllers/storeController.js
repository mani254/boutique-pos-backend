const Store = require('../models/storeSchema.js');

const storeController = {
   addStore: async (req, res) => {
      try {
         const { name, properator, phone, landLine, address, status } = req.body;

         const existingStore = await Store.findOne({ name });
         if (existingStore) {
            return res.status(400).json({ error: 'Store name already exists' });
         }

         const newStore = new Store({
            name,
            properator,
            phone,
            landLine,
            address,
            status,
            image: req.file.filename
         });

         await newStore.save();
         return res.status(201).json({ message: 'Store added successfully', store: newStore });
      } catch (error) {
         console.error("Error adding store:", error);
         return res.status(500).json({ error: "Could not add store. Please try again later." });
      }
   },
   updateStore: async (req, res) => {
      try {
         const { id } = req.params;
         let { name, properator, phone, landLine, address, status, image } = req.body;

         if (req?.file?.filename) {
            image = req.file.filename;
         }

         const store = await Store.findById(id);
         if (!store) {
            return res.status(404).json({ error: 'Store not found' });
         }
         const storeData = await Store.findByIdAndUpdate(id, { name, properator, phone, landLine, address, status, image }, { new: true });

         if (!storeData) {
            return res.status(404).json({ error: 'Store not found' });
         }
         await store.save();
         return res.status(200).json({ message: 'Store updated successfully', store: storeData });

      } catch (error) {
         console.error("Error updating store:", error);
         return res.status(500).json({ error: "Could not update store. Please try again later." });
      }
   },

   getStores: async (req, res) => {
      try {
         const stores = await Store.find();
         return res.status(200).json(stores);
      } catch (error) {
         console.error("Error fetching stores:", error);
         return res.status(500).json({ error: "Could not fetch stores. Please try again later." });
      }
   },
   deleteStore: async (req, res) => {
      try {
         const { id } = req.params;
         const store = await Store.findByIdAndDelete(id);
         if (!store) {
            return res.status(404).json({ error: 'Store not found' });
         }
         return res.status(200).json({ message: 'Store deleted successfully' });
      } catch (error) {
         console.error("Error deleting store:", error);
         return res.status(500).json({ error: "Could not delete store. Please try again later." });
      }
   },
};

module.exports = storeController;
