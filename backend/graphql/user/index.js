import mutation from './resolvers/mutation'
import query from './resolvers/query'
import userTypeDefs from "./typeDefs";

export const typeDefs = userTypeDefs
export const resolvers = {
  query,
  mutation
}
