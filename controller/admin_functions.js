const PRODUCTS = require('../model/products');
const ORDERS = require('../model/orders');
const USERS = require('../model/User');
const REVIEW = require('../model/reviews');
const cloudinary = require('../config/cloudinary')
const ROLES_LIST = require('../config/rolesList')
require('dotenv').config()

// to create a new product
const createProduct = async (req, res) => {

    try {
        const { product_name, category, Price, discounted_price, quantity, description } = req.body

        if (!product_name || !category || !Price || !quantity || !description) {
            return res.status(400).json({ "message": "bad request" })
        }
        if (!req.file) {
            return res.status(400).json({ "message": "no image found", "status": 400 })
        }
        const result = await cloudinary.uploader.upload(req.file.path,
            { folder: 'products_images' }
        )
        const optimizedUrl = cloudinary.url(result.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });

        const newProduct = await PRODUCTS.create({
            product_name: product_name,
            category: category,
            Price: Price,
            discounted_price: discounted_price,
            quantity: quantity,
            description: description,
            image_url: optimizedUrl
        })

        if (newProduct) {
            return res.status(201).json({ "message": "New Product added successfully", "status": 201, newProduct })
        } else {
            return res.status(400).json({ "message": "unallowed credentials, plss review product details and ensure it aligns with allowed paramaters " })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send("internal server error")
    }
}

// to get details on a singular product
const productDetails = async (req, res) => {

    try {
        const product_id = req.params.id
        const product = await PRODUCTS.findById(product_id)
        const reviews = await REVIEW.find({ product_id: product_id }).sort({ createdAt: -1 }).populate('user_id', 'username')
        if (product) {
            console.log(product)
            return res.status(200).json({ product, reviews })
        } else {
            return res.status(404).json({ "message": "product not found" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": "internal error" })
    }
}

// to delete a product
const deleteProduct = async (req, res) => {

    const product_id = req.params.id
    try {
        const deletedproduct = await PRODUCTS.deleteOne({ _id: product_id })
        if (deletedproduct.deletedCount == 1) {
            return res.status(200).json({ "message": "item successfully deleted" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ "message": "internal server error" })
    }
}

const getallUsers = async (req, res) => {
    try {
        const allusers = await USERS.find({}).sort({ createdAt: -1 })
        if (allusers) {
            return res.status(200).json({ "status": 200, allusers })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ "message": "internal server error" })
    }
}

const updateProduct = (req, res) => {


}

const createUser = (req, res) => {
    const { username, password } = req.body

}

const updateOrder = async (req, res) => {
    try {
        const updatedfields = req.body.updatedfields
        const order_id = req.body._id
        const order = await ORDERS.findById(order_id)
        if (order.length !== 0) {
            if (updatedfields.status !== undefined) {
                order.status = updatedfields.status
            }
            if (updatedfields.payment_status !== undefined) {
                order.payment_status = updatedfields.payment_status
            }
            await order.save()
            return res.status(200).json({ "message": "order updated successfully" })
        }
        return res.status(403).json({ "message": "order not found" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ "message": "internal server error" })
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await ORDERS.find({}).sort({ "createdAt": -1 })
        return res.status(200).json(orders)
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ "message": "internal server error" })
    }
}

const getallProducts = async (req, res) => {
    try {
        const products = await PRODUCTS.find({}).sort({ createdAt: -1 })
        return res.status(200).json(products)
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "internal error" })
    }
}

const updateUser = async (req, res) => {
    try {
        const role = req.body.role
        const user_id = req.params.id
        if (!user_id) {
            return res.status(400).json({ "message": "no user_id provided" })
        }
        const values = Object.keys(ROLES_LIST)
        if (values.includes(role)) {
            const user = await USERS.findOne({ _id: user_id })
            if (user) {
                const initial_role = user.roles
                const role_value = ROLES_LIST[role]
                if (user.roles.includes(role_value)) {
                    return res.status(400).json({ "message": "user already has this role" })
                } else {
                    new_role = initial_role.push(role_value)
                    user.roles.push(role_value)
                    await user.save()
                    return res.status(200).json({ "message": `user with id: ${user_id} is now a/an ${role}` })
                }
            } else {
                return res.status(404).json({ "message": `user with id ${user_id} not found` })
            }
        } else {
            return res.status(400).json({ "message": "bad request, unsupported role" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ "message": "internal server error" })
    }
}

const get_single_user_orders = async (req, res) => {
    try {
        const user_id = req.user_id
        if (!user_id) {
            return res.status(400).json({ "message": "invalid request" })
        }
        const user_orders = await ORDERS.find({ user_id: user_id })
        if (user_orders == []) {
            return res.status(201).json({ "message": "no orders yet" })
        }
        return res.status(200).json({ "status": 200, user_orders })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ "message": "internal server error" })
    }
}

const orderDetails = async (req, res) => {
    const order_id = req.params.id
    try {
        const orderdata = await ORDERS.findOne({ _id: order_id })
        if (orderdata) {
            return res.status(200).json({ orderdata })
        } else {
            return res.status(404).json({ "message": "order not found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ "message": "internal server error" })
    }
}

module.exports = {
    updateOrder, createProduct, createUser, deleteProduct,
    updateProduct, getOrders, getallProducts, productDetails, orderDetails, getallUsers, get_single_user_orders
    , updateUser
}