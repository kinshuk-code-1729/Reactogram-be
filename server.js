const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const {MONGO_DB_URL} = require('./config');

mongoose.connect(MONGO_DB_URL);

mongoose.connection.on('connected', () => {
    console.log("Database Connected");
})

mongoose.connection.on('error', (error) => {
    console.log("Some Connection error to DB");
})

require('./models/user_model');

app.use(cors());
app.use(express.json());

require('./models/user_model');

app.use(require('./routes/user_route'));

app.listen(PORT, () =>{
    console.log(`Server Started at : ${PORT}`);
});