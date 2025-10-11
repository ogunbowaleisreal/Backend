const express = require('express');
const router = express.Router();
const {updateOrder,getOrders,orderDetails,get_single_user_orders} = require('../controller/admin_functions');
const {createOrder} = require('../controller/product_functions');
const jwtVerify = require('../middleware/verifyJwt');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles= require('../middleware/verifyRoles');

router.route('/')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),getOrders)
      .post(jwtVerify,verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User),createOrder)

router.route('/single_order')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),orderDetails)
      .post(jwtVerify,verifyRoles(ROLES_LIST.User),get_single_user_orders)
      .patch(jwtVerify,verifyRoles(ROLES_LIST.Admin),updateOrder)


module.exports = router