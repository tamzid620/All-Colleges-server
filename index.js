const express = require('express')
const app = express()
require('dotenv').config();
const cors = require('cors')
const port =  5000;

// middleware --------------------
app.use(cors());
app.use(express.json());


// app listen-----------------------
app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
