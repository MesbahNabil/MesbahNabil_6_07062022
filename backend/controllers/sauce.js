const express = require("express")
const Sauce = require("../models/Sauce")
const fs = require("fs")

// Récupération de toutes les sauces.
exports.getSauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => {
			res.status(200).json(sauces)
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			})
		})
}

// Création d'une sauce.
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce)
	// Mango génére les id
	delete sauceObject._id
	delete sauceObject.userId

	// Spread Operator (dégrader) de ./models/Sauce
	const sauce = new Sauce({
		...sauceObject,
		userId: req.auth.userId,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
	})
	// Vérification
	if (sauce.userId !== req.auth.userId) {
		const filename = sauce.imageUrl.split("/images/")[1]
		fs.unlink(`images/${filename}`, (error) => {
			if (error) {
				throw error
			}
		})
		return res.status(403).json({ error: "Requête non autorisée !" })
	} else {
		sauce
			.save()
			.then(() => res.status(201).json({ message: "Objet enregistré !" }))
			.catch((error) => res.status(400).json({ error: error }))
	}
}

// Récupération d'une sauce par ID
exports.getSauceById = (req, res, next) => {
	Sauce.findOne({
		_id: req.params.id,
	})
		.then((sauce) => {
			res.status(200).json(sauce)
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			})
		})
}

// Suppression d'une sauce.
exports.deleteSauce = (req, res, next) => {
	Sauce.findByIdAndDelete({ _id: req.params.id })

		.then((sauce) => {
			// Vérification
			if (sauce.userId !== req.auth.userId) {
				res.status(401).json({ message: "Non-autorisé" })
			} else {
				// Nom de l'image
				const filename = sauce.imageUrl.split("/images/")[1]
				// Suppression de l'image avec fs(fileSystem)
				fs.unlink(`./backend/images/${filename}`, () => {
					Sauce.deleteOne({ _id: req.params.id })
						.then(() => res.status(200).json({ message: "Objet supprimé !" }))
						.catch((error) => res.status(400).json({ error }))
				})
			}
		})
		.catch((error) => res.status(401).json({ error }))
}

exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		  }
		: { ...req.body }
	delete sauceObject._userId

	Sauce.findOne({ _id: req.params.id }).then((sauce) => {
		// Vérification
		if (sauce.userId != req.auth.userId) {
			res.status(401).json({ message: "Non-autorisé" })
		} else {
			const filename = sauce.imageUrl.split("/images/")[1]
			fs.unlink(`./backend/images/${filename}`, () => {
				Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
					.then(() => res.status(200).json({ message: "Objet modifié !" }))
					.catch((error) => res.status(400).json({ error }))
			})
		}
	})
}

// Like et dislike d'une sauce.
exports.likeSauce = (req, res, next) => {
	const sauceId = req.params.id
	const userId = req.body.userId

	const like = req.body.like
	//  Like pour la premiere fois (like === 1)
	if (like === 1) {
		Sauce.updateOne(
			{ _id: sauceId },
			{
				$inc: { likes: like },
				$push: { usersLiked: userId },
			}
		)
			.then((sauce) => res.status(200).json({ message: "L'utilisateur Like" }))
			.catch((error) => res.status(401).json({ error }))
	}

	// dislike pour la premiere fois  (like === -1)
	else if (like === -1) {
		Sauce.updateOne(
			{ _id: sauceId },
			{
				$inc: { dislikes: -1 * like },
				$push: { usersDisliked: userId },
			}
		)
			.then((sauce) => res.status(200).json({ message: "L'utilisateur Dislike" }))
			.catch((error) => res.status(401).json({ error }))
	}
	// les changements d'avis :
	else {
		Sauce.findOne({ _id: sauceId })
			.then((sauce) => {
				if (sauce.usersLiked.includes(userId)) {
					Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
						.then((sauce) => {
							res.status(200).json({ message: "L'utilisateur annule son Like" })
						})
						.catch((error) => res.status(401).json({ error }))
					// l'utilisateur change d'avis sur son dislike
				} else if (sauce.usersDisliked.includes(userId)) {
					Sauce.updateOne(
						{ _id: sauceId },
						{
							$pull: { usersDisliked: userId },
							$inc: { dislikes: -1 },
						}
					)
						.then((sauce) => {
							res.status(200).json({ message: "L'utilisateur annule son Dislike" })
						})
						.catch((error) => res.status(401).json({ error }))
				}
			})
			.catch((error) => res.status(401).json({ error }))
	}
}
