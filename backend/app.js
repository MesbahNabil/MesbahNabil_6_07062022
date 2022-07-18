const express = require("express")
const app = express()
// ORM (Objet relational mapping)
const mongoose = require("mongoose")
// Racine
const path = require("path")

// Routes
const sauceRoutes = require("./routes/sauce")
const userRoutes = require("./routes/user")

// Cross Origin Resource Sharing (CORS) authorization
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
	next()
})

// Connection API Mongo
mongoose
	.connect("mongodb+srv://admin01:Drier-Pristine-Sadden-Upcountry2@atlascluster.gnodg.mongodb.net/?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"))

// Accès corps requête JSON (anciennement bodyParser)
app.use(express.json())

// Routes
app.use("/api/sauces", sauceRoutes)
app.use("/api/auth/", userRoutes)
app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
