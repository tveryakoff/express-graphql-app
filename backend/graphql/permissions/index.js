import { shield, rule } from 'graphql-shield'

const isAuthenticated = rule()((_, args, {req}) =>  req.isAuth)

const permissions = shield({
  Mutation: {
    createPost: isAuthenticated,
    // posts: isAuthenticated
  },

}, {allowExternalErrors: true})

export default permissions
