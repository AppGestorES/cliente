"use client";

import RegisterForm from "../Components/register/RegisterForm";
import withAuthAdmin from "../dashboard/withAuthAdmin";

const Register = () => {
    return <RegisterForm />;
};

export default withAuthAdmin(Register);
