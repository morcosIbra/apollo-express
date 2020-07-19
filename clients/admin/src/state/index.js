import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import typeDefs from './schemas';
import { resolvers } from "./resolvers";

const cache = new InMemoryCache();
cache.writeData({
  data: {
    isAuthenticated: false,
    user: {
      role: '', permissions: []
    },
    cartItems: [],
  },
});
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    headers: { authorization: localStorage.getItem('token') },
    uri: process.env.REACT_APP_GRAPHQL_URL,
  }),
  typeDefs,
  resolvers
});
export default client;

