const AWS = require('aws-sdk');

let awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const paramsTODO = {
    AttributeDefinitions: [
        {
            AttributeName: 'TODO_ID',
            AttributeType: 'N'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'TODO_ID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'TODO'
};

var paramsTODOLIST = {
    AttributeDefinitions: [
        {
            AttributeName: 'TODOLIST_ID',
            AttributeType: 'N'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'TODOLIST_ID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'TODOLIST'
};

const createTable = (params) => {
    dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Table Created", data);
        }
    });
}

createTable(paramsTODO);
createTable(paramsTODOLIST);
