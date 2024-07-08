// const express = require('express');
// const mongoose = require('mongoose');
const Customers = require('../models/customerSchema.js')
const Orders = require('../models/orderSchema.js');

const orderController = {

   // getOrders: async (req, res) => {

   //    const limit = parseInt(req.query.limit) || 20;
   //    const skip = parseInt(req.query.skip) || 0;

   //    console.log(limit, 'limit')
   //    console.log(skip, 'skip')
   //    console.log(req.store, 'store')

   //    let orders;
   //    let totalOrdersCount;

   //    try {

   //       if (!req.store) {
   //          orders = await Orders.find({})
   //             .populate('customer')
   //             .limit(limit)
   //             .skip(skip);
   //          totalOrdersCount = await Orders.countDocuments({});
   //       }
   //       else {
   //          orders = await Orders.find({ store: req.store._id })
   //             .populate({ path: 'customer', state: 'name number _id' })
   //             .limit(limit)
   //             .skip(skip);
   //          totalOrdersCount = await Orders.countDocuments({ store: req.store._id })
   //       }
   //       orders = orders.map(order => {
   //          let categories = order.items.map(item => item.category).join(", ");
   //          return {
   //             ...order.toObject(),
   //             categories: categories,
   //             items: undefined
   //          };
   //       });
   //       res.status(200).json({
   //          message: 'Orders fetched successfully',
   //          orders,
   //          totalOrdersCount
   //       });
   //    } catch (error) {
   //       console.error("Error fetching orders:", error);
   //       return res.status(500).json({ error: "Could not fetch orders. Please try again later." });
   //    }
   // },

   getOrders: async (req, res) => {
      const { limit, skip, search, status } = req.query;

      let orders;
      let totalOrdersCount;
      try {
         let searchCriteria = {};
         if (search) {
            searchCriteria = {
               $or: [
                  { 'customer.name': { $regex: search, $options: 'i' } },
                  { 'customer.number': { $regex: search, $options: 'i' } },
               ],
            };
         }

         if (status) {
            searchCriteria.status = status
         }

         if (!req.store._id) {
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
            ]).then(result => {
               if (result && result.length > 0) {
                  return result[0].total;
               } else {
                  return 0;
               }
            });
         }

         else {
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
               {
                  $match: {
                     store: req.store._id,
                     ...searchCriteria,
                  },
               },
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
               {
                  $match: {
                     store: req.store._id,
                     ...searchCriteria,
                  },
               },
               { $count: 'total' },
            ]).then(result => {
               if (result && result.length > 0) {
                  return result[0].total;
               } else {
                  return 0;
               }
            });
         }


         orders = orders.map(order => {
            let categories = order.items.map(item => item.category).join(', ');
            return {
               ...order,
               categories,
               items: undefined,
            };
         });

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
         const { name, phone, total, advance, delivaryDate, note, items } = req.body;
         let customer = await Customers.findOne({ number: phone });
         if (!customer) {
            console.log(name, phone)
            customer = new Customers({ name, number: phone });
            await customer.save();
         }
         const order = new Orders({
            price: total,
            deliveryDate: new Date(delivaryDate),
            advance: advance,
            note: note,
            customer: customer._id,
            items: items,
            store: req.store._id
         });
         await order.save();
         res.status(201).json({ message: 'Order created successfully', order })
      } catch (error) {
         console.error("Error adding order:", error);
         return res.status(500).json({ error: "Could not add order. Please try again later." });
      }
   },

};

module.exports = orderController;
