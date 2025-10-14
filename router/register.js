const express = require('express')
const router = express.Router()
const registerController = require('../controller/auth/register')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with a username, password, and optional roles.
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
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: mySecurePassword123
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["User"]
 *     responses:
 *       200:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: user johndoe successfully created
 *       403:
 *         description: Username already exists or error creating user
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: user johndoe is already taken
 */

router.route('/')
      .post(registerController)


module.exports = router