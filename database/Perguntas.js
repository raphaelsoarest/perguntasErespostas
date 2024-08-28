const Sequelize = require('sequelize');
const connection = require('./database');

const Perguntar = connection.define('PERGUNTA',{
    TITULO:{
        //tipo string para textos curtos
        type: Sequelize.STRING,
        allowNull: false
    },
    DESCRICAO:{
        //tipo text para textos longos, o allownull é para não aceitar valores nulos
        type: Sequelize.TEXT,
        allowNull: false
    }
});
//SYNC = sincronizar oque está acima com o bando de dados,
// ou seja, se não houver tabelas chamadas perguntas, ele vai criar, sincronizar, o FORCE, significa que ele não vai forçar a 
//criação da tabela se ela ja existir, ele não vai recriar se estiver como FALSE.
Perguntar.sync({force: false}).then(() => {})


module.exports = Perguntar;