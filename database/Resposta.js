const Sequelize = require('sequelize');
const connection = require('./database');


const Resposta = connection.define("RESPOSTAS",{
    CORPO: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    PEGUNTA_ID:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});
module.exports = Resposta;