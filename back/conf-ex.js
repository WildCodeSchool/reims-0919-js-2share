const  mysql = require('mysql');
const  database = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'noroot', // le nom d'utilisateur
password :  'XXXX', // le mot de passe
database :  'XXXX', // le nom de la base de données
});
module.exports = database;