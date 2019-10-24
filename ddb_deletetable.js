const AWS = require('aws-sdk');

let awsConfig = {
    "region": "localhost",
    "endpoint": "http://localhost:8000",
    "accessKeyId": "KEY_ID", "secretAccessKey": "SECRET_KEY_ID"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    TableName: process.argv[2]
};

const deleteTable = (params) => {
    dynamodb.deleteTable(params, (err, data) => {
        if (err && err.code === 'ResourceNotFoundException') {
            console.log('Error: Table not found');
        } else if (err && err.code === 'ResourceInUseException') {
            console.log('Error: Table in use');
        } else {
            console.log('Success', data);
        }
    })
}

deleteTable(params);