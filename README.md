# Hot Takes

#### _Application web de critique de sauces piquantes_

---

Projet n°6 - Formation Développeur web (Openclassrooms).
L'objectif de ce projet étant de réaliser le back-end de cette application, le front-end a été fourni par Openclassrooms.

## Prérequis & infos complémentaires

Ce projet nécessite l'installation de [NodeJS](https://nodejs.org/en/).
Il est développé en Javascript (serveur NodeJS, framework Express) et utilise une base de données NoSQL : MongoDB Atlas.

## Installation

1. Cloner ce repository : pour plus de simplicité, il contient le frontend et le backend.
2. Lancer le frontend (http://localhost:4200)

    - Positionné sur le dossier frontend, lancer les commandes : `npm install` puis `npm start`

3. Lancer le backend (http://localhost:3000)

    - Positionné sur le dossier backend, lancer les commandes : `npm install` puis `nodemon server`

## Sécurité

L'aspect sécurité étant important pour ce projet, voici les mesures de sécurité mises en place :

-   **bcrypt** : permet de hasher les mots de passe des utilisateurs
-   **jsonwebtoken** : permet de générer un token afin d'authentifier chaque requête utilisateur
-   **mangoose-unique-validator** : permet de s'assurer qu'une adresse mail ne peut être associée qu'à un seul compte utilisateur, et ne peut donc pas être utilisée plusieurs fois.
-   **mongoose** : permet de structurer les données et donc de sécuriser la manipulation de la base de données
-   **dotenv** : permet de gérer les variables d'environnement pour protéger les données sensibles. (pour les besoins de ce projet, le fichier ne se trouve pas dans gitignore)
