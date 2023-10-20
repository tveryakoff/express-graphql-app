import express from 'express'
import bodyparser from 'body-parser'
import {connectMongoDb} from './db'
import errorMiddleware from './middlewares/errorMiddleware.js'

import socketService from './services/io'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import {makeExecutableSchema} from '@graphql-tools/schema'

import {ApolloServer} from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path'
import { fileURLToPath } from 'url';
import auth from './middlewares/auth'
import {applyMiddleware} from "graphql-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import cors from 'cors'
import permissions from "./graphql/permissions/index";

const app = express()

const apolloServer= new ApolloServer({
  schema: applyMiddleware(makeExecutableSchema({
    typeDefs,
    resolvers,
  }), permissions),
  formatError: (error) => {
    if (!error.originalError) {
      return error
    }
    const {fields, code} = error.originalError
    const message = error.message || 'An error occured'
    return {message, status: code, fields}
  }
})
await apolloServer.start()


// app.use(bodyparser.urlencoded()) // x-www-form-url-encoded format
app.use(bodyparser.json()) // application/json
app.use(express.static(path.join(__dirname, 'public')) )
// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, POST, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(auth)

app.use('/graphql', cors(), bodyparser.json(), expressMiddleware(apolloServer, { context: async ({ req }) => ({ req }),
}));


app.use(errorMiddleware)


connectMongoDb().then(()=> {
  const server = app.listen(8080)
  const io = socketService.init(server)
  io.on('connection', () => {
    console.log('connected')
  })
  }
)

