const AWS = require('aws-sdk');

let awsConfig = {
    "region": "localhost",
    "endpoint": "http://localhost:8000",
    "accessKeyId": "KEY_ID", "secretAccessKey": "SECRET_KEY_ID"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const paramsTODO = {
    TableName: 'TODO',
    Key: {
        'TODO_ID': {N: '001'},
        'COMPLETED': {B: 'false'}
    }
    // ProjectionExpression: 'ATTRIBUTE_NAME'
};

const getItem = (params) => {
    dynamodb.getItem(params, (err, data) => {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Item);
        }
    });
}

getItem(paramsTODO);