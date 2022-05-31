console.log('May Node be with you.');

const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const connectionString = 'mongodb+srv://amberwaters444:aYjghDBMgKqUrkOC@cluster0.tonh3.mongodb.net/?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient



MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
      })
      app.post('/quotes', (req,res) => {
          quotesCollection.insertOne(req.body)
          .then(result => {
              console.log(result)
          })
        .catch(error =>console.error(error))
    })
    app.listen(3000,function(){
        console.log('listening on 3000')
    })
    .catch(console.error)
    
  })





  