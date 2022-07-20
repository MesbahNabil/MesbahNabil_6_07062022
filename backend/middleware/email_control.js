// Importation du module email-validator
const emailValidator = require("email-validator")

// Vérification de l'adresse email entrée par l'utilisateur
module.exports = (req, res, next) => {
	if (!emailValidator.validate(req.body.email)) {
		return res.status(400).json({ message: "Adresse email non valide" })
	} else {
		next()
	}
}
