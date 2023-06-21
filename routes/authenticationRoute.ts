import express from "express"

const router = express.Router()

import {login, register, logout} from "../controllers/authenticationController.js"

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/logout').get(logout)

export default router