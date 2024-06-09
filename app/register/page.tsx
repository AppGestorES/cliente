"use client";

import RegisterForm from "../Components/register/RegisterForm";
import withAuth from "../dashboard/withAuth";

const Register = () => {
    return <RegisterForm />;
};

export default withAuth(Register);
