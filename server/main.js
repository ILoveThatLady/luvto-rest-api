const express = require('express');
const { connectToMongo } = require('./database/connectToMongo');

const app = express();
const port = 3000;


connectToMongo();

app.get("/", (req, res) => {
    res.send("Hello friend, welcome to luvto!");
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});