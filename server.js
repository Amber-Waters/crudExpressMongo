console.log('May Node be with you');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://amberwaters444:aYjghDBMgKqUrkOC@cluster0.tonh3.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
            then(results => {
            console.log(results)
        })
        .catch(error => console.error(error))
        // const cursor = db.collection('quotes').find()
        // console.log(cursor)
        res.sendFile(__dirname + '/index.html')
        })
    app.post('/quotes',(req,res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
        })
    app.listen(3000, function() {
        console.log('listening on 3000')
        })

  })
  .catch(error => console.error(error))
