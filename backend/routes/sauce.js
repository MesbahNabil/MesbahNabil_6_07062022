const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const multer = require("../middleware/multer_config")

const sauceController = require("../controllers/sauce")

// Routers sauces
router.get("/", auth, sauceController.getSauces)
router.post("/", auth, multer, sauceController.createSauce)
router.get("/:id", auth, sauceController.getSauceById)
router.put("/:id", auth, multer, sauceController.modifySauce)
router.post("/:id/like", auth, sauceController.likeSauce)
router.delete("/:id", auth, multer, sauceController.deleteSauce)

module.exports = router
