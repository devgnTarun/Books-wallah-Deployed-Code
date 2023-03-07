const express = require('express');
const { getAllProduct , createProduct , updateProduct , deleteProduct, getProductDeatils, UserProductReview, getAllReviews, deleteReviews, getAdminProduct} = require('../controllers/productController');
const { isAuthenticatedUser ,authorizedRoles } = require('../middleware/auth');
const cloudinary = require('cloudinary')

const router = express.Router();

router.route('/products').get(getAllProduct)
 
router.route('/product/:id').get(getProductDeatils)

router.route('/admin/products').get(  isAuthenticatedUser , authorizedRoles('admin') , getAdminProduct)

router.route('/admin/product/new').post(isAuthenticatedUser , authorizedRoles('admin'), createProduct) //use autherized roles after on working

router.route('/admin/product/:id').put(isAuthenticatedUser ,authorizedRoles('admin'),  updateProduct)

router.route('/admin/product/:id').delete(  isAuthenticatedUser , authorizedRoles('admin'), deleteProduct)

router.route('/reviews').put(isAuthenticatedUser , UserProductReview)

router.route('/review').get(getAllReviews).delete(isAuthenticatedUser  , deleteReviews)

module.exports = router;