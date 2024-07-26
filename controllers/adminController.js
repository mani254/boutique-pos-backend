const Admin = require('../models/adminSchema.js');

const adminController = {

   getAdmins: async (req, res) => {
      try {
         const admins = await Admin.find()
            .select('username email store superAdmin')
            .populate({
               path: 'store',
               select: 'name _id'
            });

         const response = admins
            .filter(admin => !admin.superAdmin)
            .map(admin => ({
               _id: admin._id,
               username: admin.username,
               email: admin.email,
               store: admin.store ? { _id: admin.store._id, name: admin.store.name } : null
            }));

         res.status(200).send({ admins: response });
      } catch (err) {
         res.status(500).json({ error: err.message });
      }
   },

   addAdmin: async (req, res) => {
      const { username, email, password, store } = req.body;

      try {
         const existingAdmin = await Admin.findOne({ email });
         if (existingAdmin) {
            return res.status(400).json({ error: 'Admin with this email already exists' });
         }

         const newAdmin = new Admin({
            username,
            email,
            password,
            store
         });

         await newAdmin.save();

         const savedAdmin = await Admin.findById(newAdmin._id)
            .select('username email store')
            .populate({
               path: 'store',
               select: 'name _id'
            });

         const response = {
            _id: savedAdmin._id,
            username: savedAdmin.username,
            email: savedAdmin.email,
            store: savedAdmin.store ? { _id: savedAdmin.store._id, name: savedAdmin.store.name } : null
         };

         res.status(201).json({ message: 'Admin created successfully', admin: response });
      } catch (err) {
         res.status(500).json({ error: err.message });
      }
   },

   updateAdmin: async (req, res) => {
      const { adminId } = req.params;
      const { username, email, password, store } = req.body;

      try {
         const existingAdmin = await Admin.findById(adminId);
         if (!existingAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
         }

         if (email && email !== existingAdmin.email) {
            const emailTaken = await Admin.findOne({ email });
            if (emailTaken) {
               return res.status(400).json({ error: 'Admin with this email already exists' });
            }
         }

         existingAdmin.username = username || existingAdmin.username;
         existingAdmin.email = email || existingAdmin.email;
         existingAdmin.password = password || existingAdmin.password;
         existingAdmin.store = store || existingAdmin.store;

         await existingAdmin.save();

         const updatedAdmin = await Admin.findById(adminId)
            .select('username email store')
            .populate({
               path: 'store',
               select: 'name _id'
            });

         const response = {
            _id: updatedAdmin._id,
            username: updatedAdmin.username,
            email: updatedAdmin.email,
            store: updatedAdmin.store ? { _id: updatedAdmin.store._id, name: updatedAdmin.store.name } : null
         };

         res.status(200).json({ message: 'Admin updated successfully', admin: response });
      } catch (err) {
         res.status(500).json({ error: err.message });
      }
   },

   deleteAdmin: async (req, res) => {
      const { adminId } = req.params;

      try {
         const delAdmin = await Admin.findByIdAndDelete(adminId);

         if (!delAdmin) {
            return res.status(404).send({ error: "Admin not found" });
         }
         return res.status(200).send({ message: 'Admin deleted successfully', admin: delAdmin });
      } catch (err) {
         return res.status(500).send({ error: err.message });
      }
   }

};

module.exports = adminController;
