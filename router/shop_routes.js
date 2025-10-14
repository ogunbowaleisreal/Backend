const express = require('express')
const router = express.Router()
const {getallfeaturedProducts,updateReview, deleteReview, getbyFilter,createOrder,getuserOrders,createReviews} = require('../controller/product_functions')
const {productDetails,getallProducts} = require('../controller/admin_functions')
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles= require('../middleware/verifyRoles')

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product and order management endpoints
 */

/**
 * @swagger
 * /shop/order:
 *   post:
 *     summary: Create a new order
 *     tags: [Products]
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
 *                       example: 64f2b8c5f4d3c9f1e7a1b2c3
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       200:
 *         description: Order successfully made
 *       403:
 *         description: Some products not available
 *       404:
 *         description: Products not found
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get orders of the logged-in user
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *       404:
 *         description: No orders yet
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Internal error
 *
 *   post:
 *     summary: Get products by filter
 *     description: Filter products by category.`
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newFilter:
 *                 type: object
 *                 additionalProperties:
 *                   type: boolean
 *                 example: { "Electronics": true, "Furniture": false }
 *     responses:
 *       200:
 *         description: Products matching filters
 *       403:
 *         description: No products with chosen filters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * shop/{id}:
 *   get:
 *     summary: Get product details with reviews
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 64f2b8c5f4d3c9f1e7a1b2c3
 *     responses:
 *       200:
 *         description: Product details with reviews
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 *
 *   patch:
 *     summary: Update a review
 *     tags: [Products]
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
 *               - updateParams
 *             properties:
 *               _id:
 *                 type: string
 *                 example: 64f2b8c5f4d3c9f1e7a1b2c3
 *               updateParams:
 *                 type: object
 *                 properties:
 *                   comment:
 *                     type: string
 *                     example: "Updated comment"
 *                   review:
 *                     type: string
 *                     example: "4 stars"
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       403:
 *         description: Not allowed to update other users' reviews
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a review
 *     tags: [Products]
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
 *             properties:
 *               _id:
 *                 type: string
 *                 example: 64f2b8c5f4d3c9f1e7a1b2c3
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       403:
 *         description: Not allowed to delete other users' reviews / Review not found
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a review for a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 64f2b8c5f4d3c9f1e7a1b2c3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *               - review
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "Amazing product!"
 *               review:
 *                 type: string
 *                 example: "5 stars"
 *     responses:
 *       200:
 *         description: Review created successfully
 *       400:
 *         description: Failed to create review
 *       500:
 *         description: Internal server error
 */


router.route('/products')
      .get(jwtVerify,getallfeaturedProducts)

router.route('/order')
      .post(jwtVerify,createOrder)
      .get(jwtVerify,getuserOrders)
router.route('/')
     .get(jwtVerify,verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User),getallProducts)
     .post(jwtVerify,verifyRoles(ROLES_LIST.User,ROLES_LIST.Admin),getbyFilter)

router.route('/:id')
     .get(jwtVerify,productDetails)
     .patch(jwtVerify,updateReview)
     .delete(jwtVerify,deleteReview)
     .post(jwtVerify,createReviews)

module.exports = router