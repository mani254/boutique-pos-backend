const Customers = require('../models/customerSchema.js');
const Orders = require('../models/orderSchema.js');

const customerController = {
   // getCustomers: async (req, res) => {
   //    const { search, limit = 10, skip = 0 } = req.query;
   //    try {
   //       let query = {};
   //       if (search) {
   //          query = {
   //             $or: [
   //                { name: { $regex: search, $options: 'i' } },
   //                { number: { $regex: search, $options: 'i' } }
   //             ]
   //          };
   //       }

   //       const customers = await Customers.find(query)
   //          .skip(Number(skip))
   //          .limit(Number(limit))
   //          .sort({ createdAt: -1 });

   //       const totalCustomersCount = await Customers.countDocuments(query)

   //       const customersWithOrderCount = await Promise.all(
   //          customers.map(async (customer) => {
   //             const totalOrders = await Orders.countDocuments({ customer: customer._id });
   //             return {
   //                ...customer.toObject(),
   //                totalOrders
   //             };
   //          })
   //       );

   //       res.status(200).json({ customers: customersWithOrderCount, totalCustomersCount });


   //    } catch (error) {
   //       console.error(error);
   //       res.status(500).json({ error: 'An error occurred while fetching customers.' });
   //    }
   // },

   getCustomers: async (req, res) => {
      const { search, limit = 10, skip = 0, storeId } = req.query;
      try {
         let orderQuery = {};
         let ordersCountQuery = {}

         if (req.store) {
            orderQuery.store = req.store._id
         }
         else {
            if (storeId) orderQuery.store = storeId;
         }

         // Get unique customer IDs from orders based on store ID
         const orders = await Orders.find(orderQuery).distinct('customer');

         // If there are no orders, return an empty list
         if (!orders.length) {
            return res.status(200).json({ customers: [], totalCustomersCount: 0 });
         }

         // Build the customer query
         let customerQuery = { _id: { $in: orders } };
         if (search) {
            customerQuery.$or = [
               { name: { $regex: search, $options: 'i' } },
               { number: { $regex: search, $options: 'i' } }
            ];
         }

         const customers = await Customers.find(customerQuery)
            .skip(Number(skip))
            .limit(Number(limit))
            .sort({ createdAt: -1 });

         const totalCustomersCount = await Customers.countDocuments(customerQuery);

         // Adding totalOrders property to each customer object
         const customersWithOrderCount = await Promise.all(
            customers.map(async (customer) => {

               if (req.store) {
                  ordersCountQuery = { customer: customer._id, store: req.store }
               }
               else {
                  if (storeId) {
                     ordersCountQuery = { customer: customer._id, store: storeId }
                  }
                  ordersCountQuery = { customer: customer._id }
               }

               const totalOrders = await Orders.countDocuments(ordersCountQuery);
               return {
                  ...customer.toObject(),
                  totalOrders
               };
            })
         );

         res.status(200).json({ customers: customersWithOrderCount, totalCustomersCount });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'An error occurred while fetching customers.' });
      }
   }
};

module.exports = customerController;
