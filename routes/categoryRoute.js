const express = require("express");
const router = express.Router();
const { createCategory, getCategories, updateCategory, getCategory } = require("../controller/categoryController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Create a new category (Admin only)
router.post("/admin/categories", isAuthenticatedUser, authorizeRoles("admin"), createCategory);
router.put("/admin/categories/:id", updateCategory);

// Get all categories
router.get("/admin/categories", getCategories);
router.get("/admin/categories/:id", getCategory);

module.exports = router;
