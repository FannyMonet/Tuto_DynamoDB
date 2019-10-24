const AWS = require('aws-sdk');

let awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    RequestItems: {
        "TODO": [
            {
                PutRequest: {
                    Item: {
                        "TODO_ID":      { "N": "004" },
                        "COMPLETED":    { "B": "false" },
                        "TEXT":         { "S": "fourth todo" }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "TODO_ID":      { "N": "005" },
                        "COMPLETED":    { "B": "false" },
                        "TEXT":         { "S": "fifth todo" }
                    }
                }
            }
        ]
    }
};

const batchWriteItem = params => {
    dynamodb.batchWriteItem(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}
// batchWriteItem(params);