const Sequelize = require('sequelize');
const connection = require('../database');

const Resposta = connection.define(
  'resposta', {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}
);

Resposta.sync({ force: false }).then(() => { 
  console.log(' === Tabela RespostaS Criada com Sucesso');
});


module.exports = Resposta;