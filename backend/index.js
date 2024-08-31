import express from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())


const url = process.env.MONGO_URI
const client = new MongoClient(url);
const dbName = 'passop';
client.connect()

// get the password
app.get('/', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('documents')
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save the passwords
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('documents')
    const findResult = await collection.insertOne(password)
    res.send({ success: true, result: findResult })
})

//Delete the passwords
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('documents')
    const findResult = await collection.deleteOne(password)
    res.send({ success: true, result: findResult })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})