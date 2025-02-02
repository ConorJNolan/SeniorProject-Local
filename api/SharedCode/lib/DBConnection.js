// Imports 
const { Container } = require('@azure/cosmos');
const CosmosClient = require('@azure/cosmos').CosmosClient;
require('dotenv').config();

// Reference Constants/Configuration 
const key = process.env.COSMOS_KEY;
const endpoint = process.env.COSMOS_ENDPOINT;

/**
 *  Databases and the Constants to Access them 
 */
// Public Access Containers Reference Enum 
const TABLES = {  
    User: 'User', 
    Session: 'Session', 
    Question: 'Question', 
    Submit: 'Submit', 
    Response: 'Response' 
};
// IDs for the Databases 
const databaseIds = {
    User: 'UserDB', 
    Session: 'SessionDB', 
    Question: 'QuestionDB', 
    Submit: 'SubmissionDB', 
    Response: 'ResponseDB' 
}
// IDs for the containers
const containerIds = {
    User: 'Users', 
    Session: 'Sessions', 
    Question: 'Questions', 
    Submit: 'Submissions', 
    Response: 'Responses' 
}
// Todo: Add All Databases 

// Creating References 
// Creating Client to run everything 
const client = new CosmosClient({ endpoint, key });

// Create Database References 
const databases = {
    User: client.database(databaseIds.User), 
    // Session: client.database(databaseIds.Session), 
    // Question: client.database(databaseIds.Question), 
    // Submit: client.database(databaseIds.Submit), 
    // Response: client.database(databaseIds.Response) 
}
// Create Container References 
const containers = {
    User: databases.User.container(containerIds.User), 
    // Session: databases.Session.container(containerIds.Session), 
    // Question: databases.Question.container(containerIds.Question), 
    // Submit: databases.Submit.container(containerIds.Submit), 
    // Response: databases.Response.container(containerIds.Response) 
}

/**
 * 
 * @param {String} container Container Reference
 * @returns {Container}
 */
const GetTable = container => {
    switch(container){
        case TABLES.User: 
            return containers.User;
            break;
        // case TABLES.Session: 
        //     break;
        // case TABLES.Question: 
        //     break;
        // case TABLES.Submit: 
        //     break;
        // case TABLES.Response: 
        //     break;
        default:
            // TODO: Replace with error 
            return null;
            break;
    }
}

module.exports = {
    TABLES, 
    GetTable
}
