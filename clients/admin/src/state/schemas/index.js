import gql from "graphql-tag";

const typeDefs = gql`
   type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

   type Launch {
    isInCart: Boolean!
  }

   type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
  }
`;

export default typeDefs;