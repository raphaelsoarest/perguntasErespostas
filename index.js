const express = require("express");
const App = express();
const bodyParser = require("body-parser");

//DATABASE
const connection = require("./database/database.js");
const Perguntas = require("./database/Perguntas.js");
const Resposta = require("./database/Resposta.js");

App.set("view engine", "ejs");//falando para o express usar o EJS como motor para a view;
App.use(express.static('public'));
App.use(bodyParser.urlencoded({extended: false}));
App.use(bodyParser.json());

App.get("/", function(req, res){
    //SELECT * FROM nomeTabela = findAll;
    Perguntas.findAll({ raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        })
    });
    
});

App.get("/perguntar",(req, res) => {
    res.render("perguntar")
});

App.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Perguntas.create({
        TITULO: titulo,
        DESCRICAO: descricao
    }).then(() =>{
        res.redirect("/")
    })
});

App.get("/pergunta/:id",(req, res) => {
    var id = req.params.id;
    Perguntas.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            Resposta.findAll({
                where: {PEGUNTA_ID: id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        }else{
            res.redirect("/");
        }

    });
});

App.post("/responder", (req, res) => {
    var corpo = req.body.corpo_resposta;
    var pergunta_id = req.body.pergunta;
    Resposta.create({
        CORPO: corpo,
        PEGUNTA_ID: pergunta_id
    }).then(() =>{
        res.redirect("/pergunta/"+pergunta_id);
    })
})


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