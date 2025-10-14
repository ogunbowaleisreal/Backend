const express = require('express')
const router = express.Router()
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles= require('../middleware/verifyRoles')
const {getcartItems,deletecartItem,createoraddCart,increase_decrease_product_Quantity} = require('../controller/product_functions')


/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the user's shopping cart
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all items in the user's cart
 *     description: Returns the products in the user's cart and calculates the total price
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                 cart:
 *                   type: object
 *                   properties:
 *                     Products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product_id:
 *                             type: string
 *                           quantity:
 *                             type: number
 *                 totalPrice:
 *                   type: number
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     description: Adds a product to the user's cart or increases quantity if it already exists
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: 64f0b123abc1234567890def
 *     responses:
 *       200:
 *         description: Product added to cart or quantity increased
 *       403:
 *         description: Quantity exceeds available stock
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cart:
 *   patch:
 *     summary: Increase or decrease product quantity in the cart
 *     description: Modifies the quantity of a product in the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - type
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: 64f0b123abc1234567890def
 *               type:
 *                 type: string
 *                 description: "Type of modification: increase or decrease"
 *                 example: increase
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       403:
 *         description: Not allowed (e.g., decrease below 1 or exceeds stock)
 *       404:
 *         description: Product or cart not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Delete a product from the cart
 *     description: Removes a product from the user's cart by product ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       404:
 *         description: Cart or product not found
 *       500:
 *         description: Internal server error
 */

router.route("/")
    .get(jwtVerify,getcartItems)
    .post(jwtVerify,createoraddCart)
    .patch(jwtVerify,increase_decrease_product_Quantity)
    

router.route("/:id")
      .get(jwtVerify)
      .delete(jwtVerify,deletecartItem)

module.exports = router