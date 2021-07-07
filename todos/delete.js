// diretiva para  strict mode
'use strict'

// importação do SDK da AWS
const AWS = require('aws-sdk');

// client DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {


  const params = {
    Tablename: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // delete o "todo" do banco
  dynamodb.delete(params, (error) => {

    if(error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain'},
        body: 'Couldn\'t create the todo item.',
      });
    return;
    }
    // criação do response
   const response = {
     statusCode: 200,
     body: JSON.stringify({}),
   };

   callback(null, response);

 });
};
