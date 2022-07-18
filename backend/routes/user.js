const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")

// Routers utilisateur

router.post("/signup", userController.signup)
router.post("/login", userController.login)
module.exports = router
