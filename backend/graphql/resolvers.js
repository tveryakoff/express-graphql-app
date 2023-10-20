import {resolvers as userResolvers} from './user/index'
import {resolvers as postResolvers} from './post/index'

export default {
  Query: {
    ...userResolvers.query
  },
  Mutation: {
    ...userResolvers.mutation,
    ...postResolvers.mutation
  }
}
