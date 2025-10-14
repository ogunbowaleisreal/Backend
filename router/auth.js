const express = require('express')
const router = express.Router()
const authController = require('../controller/auth/authController')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Allows already registered users to log in and returns an access token and sets a refresh token cookie
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: myStrongPassword123
 *     responses:
 *       200:
 *         description: Login successful, returns access token and user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: cookies are set
 *                 status:
 *                   type: number
 *                   example: 200
 *                 access_token:
 *                   type: string
 *                 user_id:
 *                   type: string
 *                 username:
 *                   type: string
 *       404:
 *         description: Account not found or username/password mismatch
 *       401:
 *         description: Wrong credentials sent
 */
router.route('/')
      .post(authController)
      
module.exports = router