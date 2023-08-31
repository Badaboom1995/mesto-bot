const axios = require('axios');

async function makeRequest(ctx, url, method, body, headers) {
    try {
        const response = await axios({
            url,
            method,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });
        console.log('success')
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log('error')
            // The request was made, and the server responded with a status code that falls out of the range of 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
        throw error;
    }
}

module.exports = {makeRequest};