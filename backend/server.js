const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5542;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.json({message: "Hello!"})
});

app.get('/api/data', (req, res) => {
    // Use your API key securely here
    const apiID = process.env.API_ID;
    const appKey = process.env.APP_KEY;
    // Fetch data from the third-party API using the apiKey
    /*
    res.json({
        apiID: apiID,
        appKey: appKey
    });*/
    //res.json({ message: 'Data fetched successfully' });
    res.json({
        apiID: apiID,
        appKey: appKey
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
