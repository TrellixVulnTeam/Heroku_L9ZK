const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
var port = process.env.PORT || 3051;
/* Servidor do Banco de Dados */
const sqlite3 = require('sqlite3').verbose();
const server = express();
const DBPATH = 'banco.db';
server.use(express.static("."));
server.use(express.json());
/* Definição dos endpoints */
/******** CRUD ************/
// Retorna todos registros (é o R do CRUD - Read)
server.get('/users', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
    var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM nome';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});
// Insere um registro (é o C do CRUD - Create)
server.post('/userinsert', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
    sql = "INSERT INTO nome (telefone, idade, altura) VALUES ('" + req.body.telefone + "', '" + req.body.idade + "', '" + req.body.altura + "')";
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
    });
    db.close(); // Fecha o banco
    res.end();
});
// Atualiza um registro (é o U do CRUD - Update)
server.patch('/userupdate', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    //res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
    sql = "UPDATE nome SET telefone = '" + req.body.telefone + "' WHERE altura = " + req.body.altura;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});
// Exclui um registro (é o D do CRUD - Delete)
server.delete('/userdelete', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
    sql = "DELETE FROM nome WHERE idade = " + req.body.idade;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});
/* Inicia o servidor */
server.listen(portback, () => {
  console.log(`BD server running at http://${portback}/`);
});