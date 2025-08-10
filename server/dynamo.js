const {dynamodb } = require('./aws-config'); 
const { v4: uuidv4 } = require('uuid')

const TABLE = 'web-games-accounts';

async function addAccounts(data) {
    const params = {
        TableName: TABLE,
        Item: { id: uuidv4(),...data }
    }
    try {
        await dynamodb.put(params).promise();
        return { success: true, message: 'Account added successfully' };
    }
    catch (error) {
        return { success: false, message: 'Error adding account' };
    }
}

async function fetchAccounts () {
    const params = {TableName: TABLE}
        try {
        const data = await dynamodb.scan(params).promise();
        return { success: true, data};
    }
    catch (error) {
        console.error('fetch accounts error: ', error);
        return { success: false, message: 'Error fetching account' };
    }
}
module.exports =  { addAccounts, fetchAccounts };