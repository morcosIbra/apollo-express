import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../../utils/auth";

const Auth = () => {
    const getUser = () => {
        const { data, loading, error } = useQuery(GET_USER, {
            onCompleted({ user }) {
                localStorage.setItem("token", login);
                if(user)
                client.writeData({ data: { user, } });
            }
        });
    }
    render() {
        const authProviderValue = {
            ...this.state,
            initiateLogin: this.initiateLogin,
            handleAuthentication: this.handleAuthentication,
            logout: this.logout
        };
        return (
            <AuthProvider value={authProviderValue}>
                {this.props.children}
            </AuthProvider>
        );
    }
}

export default Auth;