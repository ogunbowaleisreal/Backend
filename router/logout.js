const express = require('express')
const router = express.Router()
const logoutController = require('../controller/auth/logoutcontroller')


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     description: Clears the user's refresh and access token cookies and invalidates the refresh token in the database
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: logged out
 *       204:
 *         description: User was already logged out
 *         content:
 *           text/plain:
 *             example: you are already logged out
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             example: internal server error, you might not be logged out
 */
    router.route('/')
         .get(logoutController)

module.exports = router