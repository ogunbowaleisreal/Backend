const express = require('express');
const router = express.Router();
const { updateOrder, getOrders, orderDetails, get_single_user_orders } = require('../controller/admin_functions');
const { createOrder } = require('../controller/product_functions');
const jwtVerify = require('../middleware/verifyJwt');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Manage orders for users and admin
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     description: Returns a list of all orders sorted by creation date
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new order
 *     description: Allows users (or admin) to create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productsarray
 *             properties:
 *               productsarray:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - quantity
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       example: 64f0b123abc1234567890def
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       200:
 *         description: Order successfully made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order successfully made
 *       403:
 *         description: Some products not available
 *       404:
 *         description: Products not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders/single_order:
 *   get:
 *     summary: Get details of a single order
 *     description: Retrieve order details by order ID (Admin/User)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Order ID to retrieve
 *         schema:
 *           type: string
 *           example: 64f0b123abc1234567890def
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderdata:
 *                   type: object
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Get all orders for the authenticated user
 *     description: Retrieves all orders for the currently logged-in user based on their authentication token
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User orders retrieved successfully or no orders yet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User orders retrieved successfully"
 *                 user_orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Order details
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error

 *   patch:
 *     summary: Update an existing order (Admin only)
 *     description: Updates status or payment_status of an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *               - updatedfields
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Order ID to update
 *                 example: 64f0b123abc1234567890def
 *               updatedfields:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: Shipped
 *                   payment_status:
 *                     type: string
 *                     example: successful
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       403:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */


router.route('/')
      .get(jwtVerify, verifyRoles(ROLES_LIST.Admin), getOrders)
      .post(jwtVerify, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), createOrder)

router.route('/single_order/')
      .get(jwtVerify, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), orderDetails)
      .post(jwtVerify, verifyRoles(ROLES_LIST.User), get_single_user_orders)
      .patch(jwtVerify, verifyRoles(ROLES_LIST.Admin), updateOrder)


module.exports = router