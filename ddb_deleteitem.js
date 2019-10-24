const AWS = require('aws-sdk');

let awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var paramsTODO = {
    TableName: 'TODO',
    Key: {
        'TODO_ID': {N: '001'},
        'COMPLETED': {B: 'false'}
    }
};

const deleteItem = params => {
    dynamodb.deleteItem(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

// deleteItem(paramsTODO)