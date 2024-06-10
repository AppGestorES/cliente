"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUsuario, verifyUser } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "../redux/store";

const withAuthRegister = (WrappedComponent: React.ComponentType) => {
    const WithAuthComponent = (props: any) => {
        const usuario = useSelector((state: RootState) => getUsuario(state));
        const router = useRouter();
        const dispatch: AppDispatch = useDispatch();
        const pathname = usePathname();
        const [isMounted, setIsMounted] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            setIsMounted(true);
        }, []);

        useEffect(() => {
            if (!isMounted) return;

            const verifyToken = async () => {
                try {
                    await dispatch(verifyUser(router)).unwrap();
                    if (pathname === "/register") {
                        router.push("/dashboard");
                    }
                    if (
                        usuario?.es_admin !== 1 &&
                        pathname === "/dashboard/admin"
                    ) {
                        router.push("/dashboard");
                    }
                } catch (error) {
                    router.push("/register");
                } finally {
                    setIsLoading(false);
                }
            };

            if (router) {
                verifyToken();
            }
        }, [dispatch, router, isMounted, pathname, usuario?.es_admin]);

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return <WrappedComponent {...props} />;
    };

    WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return WithAuthComponent;
};

export default withAuthRegister;
