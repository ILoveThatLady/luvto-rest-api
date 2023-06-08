const express = require('express');
const bodyParser = require('body-parser');
const { connectToMongo } = require('./database/connectToMongo');
const { registerUser } = require('./auth/register');
const { loginUser } = require('./auth/login');
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToMongo();

app.post('/register', registerUser);
app.post('/login', loginUser);

app.get("/", (req, res) => {
    res.send("Hello friend, welcome to luvto!");
})

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = server;