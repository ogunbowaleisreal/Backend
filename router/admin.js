const express = require('express')
const router = express.Router()
const {createProduct,createUser,updateUser,updateOrder,updateProduct,deleteProduct,getOrders,getallProducts, productDetails,orderDetails,getallUsers} = require('../controller/admin_functions')
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles= require('../middleware/verifyRoles')
const upload = require('../config/multerconfig');


/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only operations (product and user management)
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get all products
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all products sorted by creation date.
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new product
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *                 example: "Nike Air Zoom Pegasus"
 *               category:
 *                 type: string
 *                 example: "Shoes"
 *               Price:
 *                 type: number
 *                 example: 150
 *               discounted_price:
 *                 type: number
 *                 example: 120
 *               quantity:
 *                 type: number
 *                 example: 50
 *               description:
 *                 type: string
 *                 example: "High-quality running shoes"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Missing fields or invalid image
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all registered users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all users sorted by creation date
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/{id}:
 *   post:
 *     summary: Update a user's role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: Admin
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid or unsupported role
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update product details
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid update data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a product
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.route('/')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),getallProducts)
      .post(jwtVerify,verifyRoles(ROLES_LIST.Admin),upload.single('image'),createProduct)

router.route('/users')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),getallUsers)
    
router.route('/:id')
      .post(jwtVerify,verifyRoles(ROLES_LIST.Admin),updateUser)
      .patch(jwtVerify,verifyRoles(ROLES_LIST.Admin),updateProduct)
      .delete(jwtVerify,verifyRoles(ROLES_LIST.Admin),deleteProduct)      



module.exports= router