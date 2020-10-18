const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'project-app'

const id = new ObjectID()
console.log(id)

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology:true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to database!')
    }


})