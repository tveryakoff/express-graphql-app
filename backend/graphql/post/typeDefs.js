import gql from 'graphql-tag'

const typeDefs = gql`
  type Post {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    creator: User!
    createdAt: String!
    updatedAt: String
  }
  
  type PostsData {
    posts: [Post!]!
    count: Int!
  }

  input PostInputData {
    title: String!
    content: String!
    imageUrl: String!
  }
  
  extend type Query {
    post(id: ID!): Post!
    posts(page: Int): PostsData!
  }

  extend type Mutation {
    createPost(postInput: PostInputData): Post!
    updatePost(id: ID!, postInput: PostInputData): Post!
    deletePost(id: ID!): Boolean
  }
`

export default typeDefs
