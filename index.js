const express = require("express");
const App = express();
const bodyParser = require("body-parser");
const connection = require('./database/database.js');

App.set("view engine", "ejs");//falando para o express usar o EJS como motor para a view;
App.use(express.static('public'));
App.use(bodyParser.urlencoded({extended: false}));
App.use(bodyParser.json());

App.get("/", function(req, res){
    res.render("index")
});

App.get("/perguntar",(req, res) => {
    res.render("perguntar")
});

App.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("FORM" + titulo + "," + descricao);
});

console.log(process.version)
//localhost connect
App.listen(4000, function(erro){
    if(erro){
        console.log("Temos um erro " + erro + "!");
    }else{
        console.log("Servidor rodando com Sucesso!");
    };
})

//database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão OK com banco de dados');
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });