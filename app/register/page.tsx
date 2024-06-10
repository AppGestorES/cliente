"use client";

import RegisterForm from "../Components/register/RegisterForm";
import withAuthRegister from "../dashboard/withAuthRegister";

const Register = () => {
    return <RegisterForm />;
};

export default withAuthRegister(Register);
