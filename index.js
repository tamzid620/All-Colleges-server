const express = require('express')
const app = express()
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 3000;

// middleware ---
app.use(cors());
app.use(express.json());
// ---------------------------------------------------------------------------------------------------


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qtemx5j.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

// Collection section-------------------
const collegeCollection = client.db('Colleges').collection('allColleges');


// app.get-------------
app.get('/allColleges', async (req, res) =>{
    const result = await collegeCollection.find().toArray();
    res.send(result);
    });
  
// college search -----------------
app.get('/college', async(req, res) => {
  try {
    const collegeCollection = client.db("Colleges");
    const colleges = collegeCollection.collection("allColleges");
    const query = { title: "TcollegeName" };
    const options = {
      projection: { _id: 0, title: 1, },
    };
    const college = await colleges.findOne(query, options);
    if (college) {
      res.status(200).json(college);
    } else {
      res.status(404).json({ message: "College not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
})
    

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// ---------------------------------------------------------------------------------------------------

// app listen---
app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
