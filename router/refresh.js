const express = require('express')
const router = express.Router()
const refreshTokenController = require('../controller/auth/refreshToken')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh access token
 *     description: |
 *       Generates a new access token using a refresh token stored in an **HTTP-only cookie** (`jwt_refresh`).  
 *       The refresh token is **never sent in the request body or headers**, it must be present as a cookie.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access token successfully refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: access refreshed
 *                 access_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       403:
 *         description: Refresh token expired or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: refreshtokenexpired
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: JsonWebTokenError
 */


router.route('/')
         .get(refreshTokenController)

module.exports = router