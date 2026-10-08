const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "senai2026",
    database: "sistema_musica"
});

conexao.connect((erro) =>{
    if(erro){
        console.log("Erro ao conectar ao banco de dados" , erro);
    }
    console.log("Conectando ao Banco sistema_musica");
});

module.exports = conexao;