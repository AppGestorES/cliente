"use client";

import LoginForm from "../Components/login/loginForm";
import withAuth from "../dashboard/withAuth";

const Login = () => {
    return <LoginForm />;
};

export default withAuth(Login);
