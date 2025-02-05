const express = require('express');
const { getAllProducts, createProduct, updateProduct, getProductDetails, createProductReview, getAllReviews, deleteReview, deleteProduct } = require('../controller/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { getUserDetails } = require('../controller/userController');
const upload = require("../utils/upload");

const router = express.Router();
router.route("/products").get( getAllProducts)
router.route("/admin/product/:id").get( isAuthenticatedUser, authorizeRoles("admin")  ,getProductDetails)
router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin") , updateProduct)
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin") , upload.array('images', 5), createProduct)
router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin") , deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put( isAuthenticatedUser, authorizeRoles("admin"), createProductReview)

router.route("/reviews").get( getAllReviews).delete(isAuthenticatedUser ,deleteReview)

module.exports = router;