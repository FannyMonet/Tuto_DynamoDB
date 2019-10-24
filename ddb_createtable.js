const AWS = require('aws-sdk');

let awsConfig = {
    "region": "localhost",
    "endpoint": "http://localhost:8000",
    "accessKeyId": "KEY_ID", "secretAccessKey": "SECRET_KEY_ID"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const paramsTODO = {
    AttributeDefinitions: [
        {
            AttributeName: 'TODO_ID',
            AttributeType: 'N'
        },
        {
            AttributeName: 'COMPLETED',
            AttributeType: 'B'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'TODO_ID',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'COMPLETED',
            KeyType: 'RANGE'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'TODO',
    StreamSpecification: {
        StreamEnabled: false
    }
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
    TableName: 'TODOLIST',
    StreamSpecification: {
        StreamEnabled: false
    }
};

const paramsFoo = {
    AttributeDefinitions: [
        {
            AttributeName: 'FOO',
            AttributeType: 'N'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'FOO',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'FOO',
    StreamSpecification: {
        StreamEnabled: false
    }
}

const createTable = (params) => {
    dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Table Created", data);
        }
    });
}

// createTable(paramsTODO);
// createTable(paramsTODOLIST);
// createTable(paramsFoo);