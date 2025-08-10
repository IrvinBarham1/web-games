const AWS = require('aws-sdk');
const dotenv = require('dotenv').config();

console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('Has Access Key:', !!process.env.ACCESS_KEY);
console.log('Has Secret Key:', !!process.env.SECRET_KEY);

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
})

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = {dynamodb};