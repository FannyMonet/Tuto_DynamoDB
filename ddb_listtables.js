const AWS = require('aws-sdk');

let awsConfig = {
    "region": "localhost",
    "endpoint": "http://localhost:8000",
    "accessKeyId": "KEY_ID", "secretAccessKey": "SECRET_KEY_ID"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const listTables = (limit) => {
    dynamodb.listTables({Limit: limit}, (err, data) => {
        if(err) {
            console.log('Error', err);
        }
        else {
            console.log('Table names are ', data.TableNames);
        }
    });
}

listTables(10);