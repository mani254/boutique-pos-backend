const Orders = require('../models/orderSchema.js')
const Stores=require('../models/storeSchema.js')

const mongoose = require('mongoose')
const dashboardController = {
   getDashboardCount: async (req, res) => {
      try {
         const { storeId, fromDate, toDate } = req.query;

         const matchConditions = {

         }

         if (storeId) {
            matchConditions.store = new mongoose.Types.ObjectId(storeId)
         }

         if (fromDate || toDate) {
            let startDate, endDate;
            if (fromDate && !toDate) {
               startDate = new Date(fromDate);
               endDate = new Date()
               endDate.setDate(endDate.getDate() + 1);
               console.log(fromDate, endDate)
            } else if (toDate && !fromDate) {
               startDate = new Date('2024-07-01');
               endDate = new Date(toDate);
               endDate.setDate(endDate.getDate() + 1);
            } else if (fromDate && toDate) {
               startDate = new Date(fromDate);
               endDate = new Date(toDate);
               endDate.setDate(endDate.getDate() + 1);
            }
            matchConditions.deliveryDate = {
               $gte: startDate,
               $lt: endDate
            };
         }


         const totalIncomeResult = await Orders.aggregate([
            { $match: matchConditions },
            { $group: { _id: null, total: { $sum: "$price" } } }
         ]);
         const totalIncome = totalIncomeResult[0]?.total || 0;

         // Total Orders
         const totalOrders = await Orders.countDocuments(matchConditions);

         // Orders Not Delivered
         const pendingDeliveries = await Orders.countDocuments({
            ...matchConditions,
            status: { $ne: 'delivered' }
         });

         // Total Deliveries
         const totalDeliveries = await Orders.countDocuments({
            ...matchConditions,
            status: 'delivered'
         });

         // Pending Amount
         const pendingAmountResult = await Orders.aggregate([
            { $match: { ...matchConditions, status: { $ne: 'delivered' } } },
            { $group: { _id: null, total: { $sum: { $subtract: ["$price", "$advance"] } } } }
         ]);
         const pendingAmount = pendingAmountResult[0]?.total || 0;

         // Overdue Deliveries
         const currentDate = new Date();
         const overDue = await Orders.countDocuments({
            ...matchConditions,
            status: { $ne: 'delivered' },
            deliveryDate: { $lt: currentDate }
         });

         res.status(200).json({
            totalIncome,
            totalOrders,
            pendingDeliveries,
            totalDeliveries,
            pendingAmount,
            overDue
         });
      } catch (error) {
         console.error("Error fetching dashboard data:", error);
         res.status(500).json({ error: 'Internal Server Error' });
      }
   },
   getStoreContribution: async (req, res) => {
      try {
         // Fetch all stores
         const stores = await Stores.find();

         // If no stores found, return an empty array
         if (!stores.length) {
            return res.status(200).json([]);
         }

         // Calculate the total amount for each store
         const storeAmounts = await Promise.all(stores.map(async (store) => {
            const orders = await Orders.find({ store: store._id });
            const totalAmount = orders.reduce((sum, order) => sum + order.price, 0);
            return {
               store: store.name,
               totalAmount
            };
         }));

         // Calculate the overall total amount
         const overallTotalAmount = storeAmounts.reduce((sum, store) => sum + store.totalAmount, 0);

         // Calculate the percentage contribution for each store
         const storePercentages = storeAmounts.map(store => {
            const percentage = overallTotalAmount ? (store.totalAmount / overallTotalAmount) * 100 : 0;
            return {
               store: store.store,
               percentage: parseFloat(percentage.toFixed(2)) // round to 2 decimal places
            };
         });

         res.status(200).json(storePercentages);
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'An error occurred while fetching store percentages.' });
      }
   }
}


module.exports = dashboardController