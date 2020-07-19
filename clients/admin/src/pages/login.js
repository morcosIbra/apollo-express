import React from 'react';
import { LoginForm, Loading } from '../components';
import gql from 'graphql-tag';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/launches';



export default function Login() {
  const client = useApolloClient();
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login);
      client.writeData({ data: { isLoggedIn: true } });
    }
  });
  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;
  return <LoginForm login={login} />;
}
