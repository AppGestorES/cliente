"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUsuario, verifyUser } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "../redux/store";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const WithAuthComponent = (props: any) => {
        const usuario = useSelector((state: RootState) => getUsuario(state));
        const router = useRouter();
        const dispatch: AppDispatch = useDispatch();
        const pathname = usePathname();
        const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            setIsMounted(true);
        }, []);

        useEffect(() => {
            if (!isMounted) return;

            const verifyToken = async () => {
                try {
                    await dispatch(verifyUser(router)).unwrap();
                    if (pathname === "/login") {
                        router.push("/dashboard");
                    }
                    if (
                        usuario?.es_admin !== 1 &&
                        pathname === "/dashboard/admin"
                    ) {
                        router.push("/dashboard");
                    }
                } catch (error) {
                    console.log(error)
                    router.push("/login");
                }
            };

            if (router) {
                verifyToken();
            }
        }, [dispatch, router, isMounted, pathname, usuario?.es_admin]);

        return <WrappedComponent {...props} />;
    };

    WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return WithAuthComponent;
};

export default withAuth;
