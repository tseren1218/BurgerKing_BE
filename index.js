const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
const port = 5555;

const uri = "mongodb+srv://admin:admin@burgerking.uqosg7q.mongodb.net/?retryWrites=true&w=majority";

~
app.use(cors());

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function connect() {
    try {
        await client.connect(uri);
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.log(err);
    }
}

connect();

const dbName = "BurgerKing";
const collectionName = "Burgers";

const db = client.db(dbName);
const collection = db.collection(collectionName);

let documents;
async function browseCollection() {
    try {
        documents = await collection.find().toArray();
        console.log(documents);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

browseCollection();


app.get('/', (req, res) => {
res.send('Hello World!')
})
 
app.listen(port, () => {
console.log(`Server is listening at http: //localhost:port`)
})

app.get("/products", (req, res) => {
    res.status(200).send(documents);
})