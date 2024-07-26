const express = require("express");
const apiRouter = express.Router();

const authRouter = require('./authRouter.js')
const categoryRouter = require('./categoryRouter.js')
const storeRouter = require('./storeRouter.js')
const adminRouter = require('./adminRouter.js')
const orderRouter = require('./orderRouter.js')
const customerRouter = require('./customerRouter.js')

apiRouter.use('/auth', authRouter)
apiRouter.use('/categories', categoryRouter)
apiRouter.use('/stores', storeRouter)
apiRouter.use('/admins', adminRouter)
apiRouter.use('/order', orderRouter)
apiRouter.use('/customer', customerRouter)

module.exports = apiRouter;