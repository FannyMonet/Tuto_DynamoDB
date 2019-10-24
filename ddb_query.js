const AWS = require('aws-sdk');

let awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var paramsTODO = {
    ExpressionAttributeValues: {
        ':TODO_ID': {N: '001'},
        ':COMPLETED': {B: 'false'},
    },
    KeyConditionExpression: 'TODO_ID = :TODO_ID and COMPLETED = :COMPLETED',
    ProjectionExpression: 'TODO_ID, COMPLETED',
    // FilterExpression: 'contains (Subtitle, :topic)',
    TableName: 'TODO'
};


const queryTODO = params => {
    dynamodb.query(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            data.Items.forEach(element => {
                console.log(element.TODO_ID.N + " (" + element.COMPLETED.B + ")");
            });
        }
    });
}
queryTODO(paramsTODO);