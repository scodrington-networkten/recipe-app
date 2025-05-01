const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5542;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "Hello there!!"})
});

app.get('/api/recipes', async (req, res) => {

    const {query} = req.query;

    // Use your API key securely here
    let apiId = process.env.API_ID;
    let appKey = process.env.APP_KEY;
    let baseUrl = process.env.API_BASE_URL;

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Edamam-Account-User': process.env.API_EDAMAM_ACCOUNT
    }

    let requestUrl = `${baseUrl}?q=${query}&app_id=${apiId}&app_key=${appKey}&type=public`;
    let data = {};

    //fetch from the API recipes that relate to those ingredients
    try {
        const response = await fetch(requestUrl, {
            'headers': headers,
            'method': 'GET'
        })

        if (!response.ok) {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }

        data = await response.json();
    } catch (error) {
        throw new Error(`HTTP error! Status: ${error.message}`);
    }

    //return the response
    return res.json(data);

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
