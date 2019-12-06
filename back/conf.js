const  mysql = require('mysql');
const  database = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'jessyjessica', // le mot de passe
database :  'toshare', // le nom de la base de données
});
module.exports = database;