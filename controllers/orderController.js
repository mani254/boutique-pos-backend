// const express = require('express');
// const mongoose = require('mongoose');
// const { default: OrdersLayout } = require('../../frontend/src/components/Orders/OrdersLayout.jsx');
const Customers = require('../models/customerSchema.js')
const Orders = require('../models/orderSchema.js');
const Stores = require('../models/storeSchema.js')
const mongoose = require('mongoose');

const orderController = {



   // getOrders: async (req, res) => {
   //    const { limit, skip, search, status, deliveryDate } = req.query;

   //    let orders;
   //    let totalOrdersCount;
   //    try {
   //       let searchCriteria = {};
   //       if (search) {
   //          searchCriteria = {
   //             $or: [
   //                { 'customer.name': { $regex: search, $options: 'i' } },
   //                { 'customer.number': { $regex: search, $options: 'i' } },
   //                { $expr: { $regexMatch: { input: { $toString: "$invoice" }, regex: search, options: "i" } } }
   //             ],
   //          };
   //       }

   //       if (status) {
   //          searchCriteria.status = status
   //       }
   //       if (deliveryDate) {
   //          const date = new Date(deliveryDate);
   //          const nextDay = new Date(date);
   //          nextDay.setDate(date.getDate() + 1);

   //          searchCriteria.deliveryDate = {
   //             $gte: date,
   //             $lt: nextDay
   //          };
   //       }

   //       if (!req.store._id) {
   //          orders = await Orders.aggregate([
   //             {
   //                $lookup: {
   //                   from: 'Customers',
   //                   localField: 'customer',
   //                   foreignField: '_id',
   //                   as: 'customer',
   //                },
   //             },
   //             { $unwind: '$customer' },
   //             { $match: searchCriteria },
   //             { $skip: parseInt(skip) },
   //             { $limit: parseInt(limit) },
   //          ]);

   //          totalOrdersCount = await Orders.aggregate([
   //             {
   //                $lookup: {
   //                   from: 'Customers',
   //                   localField: 'customer',
   //                   foreignField: '_id',
   //                   as: 'customer',
   //                },
   //             },
   //             { $unwind: '$customer' },
   //             { $match: searchCriteria },
   //             { $count: 'total' },
   //          ]).then(result => {
   //             if (result && result.length > 0) {
   //                return result[0].total;
   //             } else {
   //                return 0;
   //             }
   //          });
   //       }

   //       else {
   //          orders = await Orders.aggregate([
   //             {
   //                $lookup: {
   //                   from: 'Customers',
   //                   localField: 'customer',
   //                   foreignField: '_id',
   //                   as: 'customer',
   //                },
   //             },
   //             { $unwind: '$customer' },
   //             {
   //                $match: {
   //                   store: req.store._id,
   //                   ...searchCriteria,
   //                },
   //             },
   //             { $skip: parseInt(skip) },
   //             { $limit: parseInt(limit) },
   //          ]);

   //          totalOrdersCount = await Orders.aggregate([
   //             {
   //                $lookup: {
   //                   from: 'Customers',
   //                   localField: 'customer',
   //                   foreignField: '_id',
   //                   as: 'customer',
   //                },
   //             },
   //             { $unwind: '$customer' },
   //             {
   //                $match: {
   //                   store: req.store._id,
   //                   ...searchCriteria,
   //                },
   //             },
   //             { $count: 'total' },
   //          ]).then(result => {
   //             if (result && result.length > 0) {
   //                return result[0].total;
   //             } else {
   //                return 0;
   //             }
   //          });
   //       }


   //       orders = orders.map(order => {
   //          let categories = order.items.map(item => item.category).join(', ');
   //          return {
   //             ...order,
   //             categories,
   //             items: undefined,
   //          };
   //       });

   //       res.status(200).json({
   //          message: 'Orders fetched successfully',
   //          orders,
   //          totalOrdersCount,
   //       });

   //    } catch (error) {
   //       console.error(error);
   //       res.status(500).json({ error: 'Server error' });
   //    }
   // },

   getOrders: async (req, res) => {
      const { limit, skip, status, fromDate, toDate, search, storeId } = req.query;

      let orders;
      let totalOrdersCount;
      try {
         let searchCriteria = {};


         if (search) {
            searchCriteria = {
               $or: [
                  { 'customer.name': { $regex: search, $options: 'i' } },
                  { 'customer.number': { $regex: search, $options: 'i' } },
                  { $expr: { $regexMatch: { input: { $toString: "$invoice" }, regex: search, options: "i" } } }
               ],
            };
         }

         if (req.store) {
            searchCriteria.store = req.store._id
         }
         else {
            if (storeId) {
               const store = await Stores.findById(storeId)
               searchCriteria.store = store._id
            }
         }

         if (status) {
            searchCriteria.status = status;
         }

         if (fromDate || toDate) {
            let startDate, endDate;
            if (fromDate && !toDate) {
               startDate = new Date(fromDate);
               endDate = new Date();
               endDate.setDate(endDate.getDate() + 1);
            } else if (toDate && !fromDate) {
               startDate = new Date('2024-07-01');
               endDate = new Date(toDate);
               endDate.setDate(endDate.getDate() + 1);
            } else if (fromDate && toDate) {
               startDate = new Date(fromDate);
               endDate = new Date(toDate);
               endDate.setDate(endDate.getDate() + 1);
            }
            searchCriteria.deliveryDate = {
               $gte: startDate,
               $lt: endDate
            };
         }

         orders = await Orders.aggregate([
            {
               $lookup: {
                  from: 'Customers',
                  localField: 'customer',
                  foreignField: '_id',
                  as: 'customer',
               },
            },
            { $unwind: '$customer' },
            { $match: searchCriteria },
            { $skip: parseInt(skip) },
            { $limit: parseInt(limit) },
         ]);

         totalOrdersCount = await Orders.aggregate([
            {
               $lookup: {
                  from: 'Customers',
                  localField: 'customer',
                  foreignField: '_id',
                  as: 'customer',
               },
            },
            { $unwind: '$customer' },
            { $match: searchCriteria },
            { $count: 'total' },
         ]).then(result => (result.length > 0 ? result[0].total : 0));

         orders = orders.map(order => ({
            ...order,
            categories: order.items.map(item => item.category).join(', '),
            items: undefined,
         }));

         res.status(200).json({
            message: 'Orders fetched successfully',
            orders,
            totalOrdersCount,
         });

      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Server error' });
      }
   },

   getOrderById: async (req, res) => {
      try {
         const { orderId } = req.params;
         const order = await Orders.findById(orderId).populate('customer');
         if (!order) {
            return res.status(404).json({ error: "Order not found" });
         }
         res.json(order);
      } catch (err) {
         console.error(err);
         res.status(500).json({ error: "Server error" });
      }
   },



   // getOrders: async (req, res) => {
   //    const { limit, skip, search } = req.query;

   //    let orders;
   //    let totalOrdersCount;
   //    try {
   //       let searchCriteria = {};
   //       if (search) {
   //          searchCriteria = {
   //             $or: [
   //                { 'customer.name': { $regex: search, $options: 'i' } },
   //                { 'customer.number': { $regex: search, $options: 'i' } },
   //             ],
   //          };
   //       }

   //       if (!req.store._id) {
   //          orders = await Orders.find(searchCriteria)
   //             .populate('customer')
   //             .skip(parseInt(skip))
   //             .limit(parseInt(limit));

   //          totalOrdersCount = await Orders.find(searchCriteria).countDocuments();
   //       } else {
   //          orders = await Orders.find({ store: req.store._id, ...searchCriteria })
   //             .populate('customer')
   //             .skip(parseInt(skip))
   //             .limit(parseInt(limit));

   //          totalOrdersCount = await Orders.find({ store: req.store._id, ...searchCriteria }).countDocuments();
   //       }

   //       orders = orders.map(order => {
   //          let categories = order.items.map(item => item.category).join(', ');
   //          return {
   //             ...order.toObject(),
   //             categories,
   //             items: undefined,
   //          };
   //       });

   //       res.status(200).json({
   //          message: 'Orders fetched successfully',
   //          orders,
   //          totalOrdersCount,
   //       });
   //    } catch (error) {
   //       console.error(error);
   //       res.status(500).json({ error: 'Server error' });
   //    }
   // },

   addOrder: async (req, res) => {
      try {
         const { name, phone, total, advance, deliveryDate, note, items, invoice } = req.body;

         if (!name || !phone || !total || !deliveryDate || !items) {
            return res.status(400).json({ error: "Missing required fields" });
         }

         let customer = await Customers.findOne({ number: phone });

         if (!customer) {
            customer = new Customers({ name, number: phone });
            await customer.save();
         } else {
            customer.name = name;
            await customer.save();
         }

         const order = new Orders({
            price: total,
            deliveryDate: new Date(deliveryDate),
            advance: advance,
            note: note,
            customer: customer._id,
            items: items,
            store: req.store._id,
            invoice: invoice
         });
         await order.save();

         res.status(201).json({ message: 'Order created successfully', order });
      } catch (error) {
         console.error("Error adding order:", error);
         return res.status(500).json({ error: "Could not add order. Please try again later." });
      }
   },

   updateOrderStatus: async (req, res) => {
      try {
         const { orderId, status } = req.body;

         if (!orderId || !status) {
            return res.status(400).json({ error: "Missing required fields" });
         }

         const order = await Orders.findById(orderId);

         if (!order) {
            return res.status(404).json({ error: "Order not found" });
         }

         order.status = status;
         await order.save();

         res.status(200).json({ message: 'Order status updated successfully', order });
      } catch (error) {
         console.error("Error updating order status:", error);
         return res.status(500).json({ error: "Could not update order status. Please try again later." });
      }
   },

};

module.exports = orderController;
