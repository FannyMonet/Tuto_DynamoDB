const AWS = require('aws-sdk');

let awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var paramsTODO = {
    TableName: 'TODO',
    Item: {
        'TODO_ID': {N: '001'},
        'COMPLETED': {B: 'false'},
        'TEXT': {S: 'Finish DynamoDB Tutorial'} 
    }
};

var paramsTODOLIST = {
    TableName: 'TODOLIST',
    Item: {
        'TODOLIST_ID': {N: '001'},
        'FILTER': {S: 'SHOW_ALL'}
    }
};

const putItem = params => {
    dynamodb.putItem(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

// putItem(paramsTODO);
// putItem(paramsTODOLIST);