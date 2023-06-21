import express  from "express"

const router = express.Router()

import { getProduct } from "../controllers/productsController"
import { authenticateUser } from "../middlewares/authenticationMiddleware.js"

router.route('/').get(authenticateUser, getProduct)

export default router