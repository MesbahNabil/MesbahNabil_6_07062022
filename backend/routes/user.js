const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")
const email_control = require("../middleware/email_control")
const limiter = require("../middleware/limiter")

// Routers utilisateur

router.post("/signup", email_control, userController.signup)
router.post("/login", limiter, userController.login)
module.exports = router
