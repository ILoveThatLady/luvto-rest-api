const express = require('express');
const { connectToMongo } = require('./database/connectToMongo');

const register = require('./auth/register');
const login = require('./auth/login');

const app = express();
const port = 3000;

connectToMongo();

app.post('/register', register.registerUser);
app.post('/login', login.loginUser);

app.get("/", (req, res) => {
    res.send("Hello friend, welcome to luvto!");
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});