
import React from 'react';
import { Redirect } from "@reach/router";

const Route = ({ component: Component, ...rest }) => {
    const fakeAuth = {
        isAuthenticated:true
     }
    return (
      <Route
        {...rest}
        render={props =>
          fakeAuth.isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  };

  export default Route;