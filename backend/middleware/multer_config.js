const multer = require("multer")

// Dictionnaire d'extension
const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
}

// Acceptation d'images
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./backend/images/")
	},

	filename: (req, file, callback) => {
		const extension = MIME_TYPES[file.mimetype]
		callback(null, Date.now() + "_" + Math.round(Math.random() * 1e18) + "." + extension)
	},
})

module.exports = multer({ storage: storage }).single("image")
