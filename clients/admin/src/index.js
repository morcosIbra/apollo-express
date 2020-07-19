
import gql from 'graphql-tag';
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import client from './state';
import Pages from "./pages";
import injectStyles from "./styles";
import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import Login from "./pages/login";
import i18n from './localization';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}


injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Suspense fallback={'...loading'}>
      <IsLoggedIn />
    </Suspense>
  </ApolloProvider>
  ,
  document.getElementById("root")
);