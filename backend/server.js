const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const dbURI = 'mongodb://localhost:27017/watharedb'; 

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const employeeRouter = require('./routes/employee');

app.use('/employee', employeeRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
