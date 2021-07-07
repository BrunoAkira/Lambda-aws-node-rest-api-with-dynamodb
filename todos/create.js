// diretiva para  strict mode
'use strict'

//criação de um UUID
const uuid = require('uuid');

// chamada do SDK para utilização de comandos AWS
const AWS = require('aws-sdk');

// chama um client DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient();

//criação da função
module.exports.create = (event,context,callback) => {
  // variáveis para pegar horário e data
  const timestap = new Data().getTime();
  // ?
  const data = JSON.parse(event.body);

  // if para saber se a data convertida é string?
  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback (null, {
      statusCode: 400,
      headers: { 'Content-Type' : 'text/plan' },
      body: 'Couldn\'t create the todo item.',
    });
    return;
  }

// informacoes dos dados que serão inseridos na tabela
  const params = {
    // process ?
    Tablename: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: data.text,
      checked: false,
      createAt: timestamp,
      updateAt: timestamp,
    },
  };

  // escrever o todo para o banco
  dynamodb.put(params, (error) => {

// if de validação
    if (error){
      console.error(error);
      callback (null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain'},
        body: 'Couldn\'t create the todo item.',
      });
      return;
    }

    // criação do response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    // retorna o que?
    callback(null, response);
  };
};
