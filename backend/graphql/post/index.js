import postTypeDefs from './typeDefs'
import mutation from './resolvers/mutation'
import query from './resolvers/query'

export const typeDefs = postTypeDefs

export const resolvers = {
  query,
  mutation
}
