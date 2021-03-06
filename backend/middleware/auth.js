require("dotenv").config()
const jwt = require("jsonwebtoken")

// Authentification

module.exports = (req, res, next) => {
	try {
		// Bearer
		const token = req.headers.authorization.split(" ")[1]
		const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
		const userId = decodedToken.userId
		userIdParamsUrl = req.originalUrl.split("=")[1]

		req.auth = {
			userId,
		}

		if (req.body.userId && req.body.userId !== userId) {
			throw "User ID non valable !"
		} else {
			next()
		}
	} catch (error) {
		res.status(401).json({ error })
	}
}
