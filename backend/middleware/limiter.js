const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 3, // 3 essais toute les 5 minutes.
	message: "Veuillez réessayer dans cinq minutes.",
})

module.exports = limiter
