const express = require('express')
const router = express.Router()
const jwtVerify = require('../middleware/verifyJwt')
const {create_checkout_session,payment_webhook} = require('../controller/payment_gateway')
const body_parser = require('body-parser')

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Stripe payment gateway operations
 */

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Create a Stripe checkout session
 *     description: Generates a Stripe checkout session for the user's cart and returns a payment URL
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - address
 *               - success_url
 *               - cancel_url
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: 64f0b123abc1234567890def
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *               success_url:
 *                 type: string
 *                 example: "https://yourapp.com/success"
 *               cancel_url:
 *                 type: string
 *                 example: "https://yourapp.com/cancel"
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: test successful
 *                 url:
 *                   type: string
 *                   example: "https://checkout.stripe.com/pay/cs_test_123456"
 *       403:
 *         description: Product details not correct or some products don’t exist anymore
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /checkout/webhook:
 *   post:
 *     summary: Stripe payment webhook
 *     description: Receives Stripe webhook events to update order payment status
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Stripe webhook payload
 *     responses:
 *       200:
 *         description: Event received successfully
 *       500:
 *         description: Internal server error
 */

router.route("/")
    .post(jwtVerify,create_checkout_session)
router.route("/webhook")
    .post(body_parser.raw({type:'application/json'}),payment_webhook)

module.exports = router