import gql from "graphql-tag";

export const GET_USER = gql`
  query GetUser {
    authenticated @client
    user @client
  }
`;