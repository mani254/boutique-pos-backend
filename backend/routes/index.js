const express = require("express");
const apiRouter = express.Router();

const authRouter = require('./authRouter.js')
// const storeRouter = require('./storeRouter.js')
// const categoryRouter = require('./categoryRouter.js')
// const customerRouter = require('./customerRouter.js')
// const orderRouter = require('./orderRouter.js')

apiRouter.use('/auth', authRouter)
// apiRouter.use("/stores", storeRouter);
// apiRouter.use("/categories", categoryRouter);
// apiRouter.use('/cutomers', customerRouter);
// apiRouter.use('/orders', orderRouter)

module.exports = apiRouter;