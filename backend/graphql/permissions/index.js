import { shield, rule } from 'graphql-shield'

const isAuthenticated = rule()((_, args, {req}) =>  req.isAuth)

const permissions = shield({
  Query: {
    posts: isAuthenticated

  },
  Mutation: {
    createPost: isAuthenticated,
  },

}, {allowExternalErrors: true})

export default permissions
