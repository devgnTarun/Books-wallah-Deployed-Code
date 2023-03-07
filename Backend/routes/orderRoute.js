const express = require('express');
const { newOrder, singleOrder, myOrders, getAllOrders, updateOrders, deleteOrders } = require('../controllers/OrderController');
const router = express.Router();
const { isAuthenticatedUser ,authorizedRoles } = require('../middleware/auth');

router.route('/order/now').post( isAuthenticatedUser , newOrder)

router.route('/order/me').get( isAuthenticatedUser , myOrders );
 
router.route('/order/:id').get( isAuthenticatedUser ,  singleOrder );

router.route('/admin/orders').get(isAuthenticatedUser , authorizedRoles('admin'), getAllOrders)

router.route('/admin/order/:id').put(isAuthenticatedUser , authorizedRoles('admin'), updateOrders).delete(isAuthenticatedUser , authorizedRoles('admin'),deleteOrders)




module.exports = router;