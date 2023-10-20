import gql from 'graphql-tag'
import {typeDefs as userTypeDefs} from "./user/index";
import {typeDefs as postTypeDefs} from './post/index'

const rootTypedef = gql`
  type Query {
    _empty: String
  }
  
  type Mutation {
   _empty: String
  }
`

export default [rootTypedef, userTypeDefs, postTypeDefs]
