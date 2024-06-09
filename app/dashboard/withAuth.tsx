"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { verifyUser } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const WithAuthComponent = (props: any) => {
        const router = useRouter();
        const dispatch: AppDispatch = useDispatch();
        const [isVerified, setIsVerified] = useState(false);
        const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            setIsMounted(true);
        }, []);

        useEffect(() => {
            if (!isMounted) return;

            const verifyToken = async () => {
                try {
                    await dispatch(verifyUser()).unwrap();
                    setIsVerified(true);
                } catch (error) {
                    console.error(error);
                    router.push("/login");
                }
            };

            if (router) {
                verifyToken();
            }
        }, [dispatch, router, isMounted]);

        if (!isVerified) {
            return <p>Loading...</p>;
        }

        return <WrappedComponent {...props} />;
    };

    WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return WithAuthComponent;
};

export default withAuth;
