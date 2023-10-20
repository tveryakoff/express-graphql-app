import gql from 'graphql-tag'

const userTypeDefs = gql`
   type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String!
  }

  input UserInputData {
    email: String!
    name: String!
    password: String!
  }
  
  type AuthData {
    token: String!
    userId: String!
  }
  
  extend type Mutation {
    createUser(userInput: UserInputData): User!
  }
  
  extend type Query {
    login(email: String!, password: String!): AuthData!
  }
  
`

export default userTypeDefs
