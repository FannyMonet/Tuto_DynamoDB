const AWS = require('aws-sdk');

let awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    // ExpressionAttributeValues: {
    //     ':s': {N: '2'},
    //     ':e': {N: '09'},
    //     ':topic': {S: 'PHRASE'}
    // },
    ProjectionExpression: 'TODO_ID, COMPLETED',
    // FilterExpression: 'contains (Subtitle, :topic)',
    TableName: 'TODO'
};

const scan = params => {
    dynamodb.scan(params, (err, data) => {
        if (err) {
          console.log("Error", err);
        } else {
            //console.log("Success", data.Items);
            data.Items.forEach((element) => {
                console.log(element.TODO_ID.N + " (" + element.COMPLETED.B + ")");
            });
        }
    });
}

scan(params);