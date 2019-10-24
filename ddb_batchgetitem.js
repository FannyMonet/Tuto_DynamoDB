const AWS = require('aws-sdk');

let awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    RequestItems: {
        'TODO': {
            Keys: [
                {'TODO_ID': {N: '001'}, 'COMPLETED': {B: 'false'}},
                {'TODO_ID': {N: '004'}, 'COMPLETED': {B: 'false'}},
                {'TODO_ID': {N: '005'}, 'COMPLETED': {B: 'false'}}
            ],
            ProjectionExpression: 'TODO_ID, COMPLETED'
        }
    }
};

const batchGetItem = params => {
    dynamodb.batchGetItem(params, (err, data) => {
        if (err) {
          console.log("Error", err);
        } else {
          data.Responses.TODO.forEach(element => {
            console.log(element);
          });
        }
    });
}
batchGetItem(params);