'use strict'

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list = (event, context, callback) => {
  // busca all "todos" no banco

  dynamodb.scan(params, (error, result) => {

    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todos.',
      });

      return;
    }
  }
  // create a response
     const response = {
       statusCode: 200,
       body: JSON.stringify(result.Items),
     };
     callback(null, response);
   });
 };
