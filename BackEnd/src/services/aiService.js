const axios = require('axios');

const AI_API_URL = process.env.AI_API_URL; // URL for the AI service

// Function to process user queries
const processQuery = async (query) => {
    try {
        const response = await axios.post(`${AI_API_URL}/process`, { query });
        return response.data;
    } catch (error) {
        throw new Error('Error processing query: ' + error.message);
    }
};

// Function to get AI-generated solutions for math problems
const getMathSolution = async (problem) => {
    try {
        const response = await axios.post(`${AI_API_URL}/solve`, { problem });
        return response.data;
    } catch (error) {
        throw new Error('Error getting math solution: ' + error.message);
    }
};

// Exporting the functions
module.exports = {
    processQuery,
    getMathSolution,
};