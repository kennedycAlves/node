const mysql = require('mysql2')


const conexao = mysql.createConnection("mysql://root:admin@10.0.2.2:3306/node")
    

module.exports = conexao