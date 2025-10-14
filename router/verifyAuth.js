const express = require('express')
const router = express.Router()
const  verifyAuthController= require('../controller/auth/verifylogin')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and token verification endpoints
 */

/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Verify if the access token is valid
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid and user is verified
 *       401:
 *         description: No token provided, malformed, expired, or invalid token
 */


router.route('/')
         .get(verifyAuthController)

module.exports = router