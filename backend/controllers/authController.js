const Admin = require('../models/adminSchema.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const authController = {
   login: async (req, res) => {
      try {
         const { email, password } = req.body

         const existingAdmin = await Admin.findOne({ email }).populate({ path: 'store', select: 'name _id' });

         if (existingAdmin) {
            const passwordMatch = await bcrypt.compare(password, existingAdmin.password);
            if (passwordMatch) {
               let details = { username: existingAdmin.username, _id: existingAdmin._id, email: existingAdmin.email, superAdmin: existingAdmin.superAdmin, store: existingAdmin.store }
               const token = jwt.sign({ adminId: existingAdmin._id, superAdmin: existingAdmin.superAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });
               res.cookie("token", token, { httpOnly: true });
               return res.status(200).json({ message: "Login successful", token, user: details });
            }
            return res.status(401).json({ error: "Invalid credentials" });
         }
         return res.status(404).json({ error: "Admin not found" });
      } catch (error) {
         console.log("Error logging as Admin:", error);
         return res.status(500).json({ error: "Could not log in Admin. Please try again later." });
      }
   },
   initialLogin: async (req, res) => {

      try {

         const { token } = req.body
         console.log(token, 'token')
         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

         if (decoded) {
            const user = await Admin.findById(decoded.adminId).populate('store')
            if (user) {
               let details = { username: user.username, _id: user._id, email: user.email, superAdmin: user.superAdmin, store: user.store }
               return res.status(200).json({ message: "initial Login Succesfull", user: details });
            } else {
               return res.status(404).json({ error: 'User not found' });
            }
         }

      } catch (error) {
         console.log('Error when the initial SignIn', error)
         return res.status(500).json({ error: "Could not log in Admin. Please try again later." });
      }
   }
};

module.exports = authController;
