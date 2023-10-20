import mongoose from 'mongoose'

const uri = 'mongodb+srv://tveryakoff:bigDictTestDb@cluster0.38wicoq.mongodb.net'

const DB_NAME = 'udemy-blog'

export const connectMongoDb = () => mongoose.connect(`${uri}/?retryWrites=true&w=majority`, {dbName: DB_NAME}).then((mongoClient) => {
  console.log('connected to Mongo Db')
}).catch(e => {
  console.log('Error during connection to mongo db', e)
})
