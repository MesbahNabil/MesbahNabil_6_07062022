require("dotenv").config()
const jwt = require("jsonwebtoken")

// Authentification
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
		const userId = decodedToken.userId
		userIdParamsUrl = req.originalUrl.split("=")[1]

		req.auth = {
			userId: userId,
		}

		next()
	} catch (error) {
		res.status(401).json({ error })
	}
}
