"use client";

import { MenuProps } from "@/app/interfaces/MenuInterfaces";
import MenuLink from "@/app/Components/Layout/MenuComponents/MenuLink";
import Link from "next/link";
import Logo from "../Logo";
import { getUsuario } from "@/app/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";

const prop: MenuProps[] = [
    {
        icon: "pi pi-box",
        name: "Entrada de productos",
        link: "/dashboard/entrada-productos",
    },
    {
        icon: "pi pi-external-link",
        name: "Salida de productos",
        link: "/dashboard/salida-productos",
    },
    {
        icon: "pi pi-chart-bar",
        name: "Materias primas",
        link: "/dashboard/materias-primas",
    },
    {
        icon: "pi pi-calculator",
        name: "Fórmulas",
        link: "/dashboard/formulas",
    },
    {
        icon: "pi pi-book",
        name: "Productos finales",
        link: "/dashboard/productos-finales",
    },
    {
        icon: "pi pi-search",
        name: "Trazabilidad",
        link: "/dashboard/trazabilidad",
    },
    {
        icon: "pi pi-cog",
        name: "Configuración",
        link: "/dashboard/configuracion",
    },
    {
        icon: "pi pi-file",
        name: "Registro de actividad",
        link: "/dashboard/registro-actividad",
    },
    {
        icon: "pi pi-shield",
        name: "Acerca de",
        link: "/dashboard/acerca-de",
    },
];

export default function Menu() {
    const usuario = useSelector((state: RootState) => getUsuario(state));

    const toggleMobileMenu = () => {
        const menuList = document.querySelector<HTMLUListElement>(".menuList");
        menuList?.classList.toggle("hidden");
        menuList?.classList.toggle("translate-x-[0%]");
        if (!menuList?.classList.contains("flex")) {
            menuList?.classList.add("flex");
        }
    };

    return (
        <aside className="menu border-t-2 md:border-t-0 md:border-r-2 border-[var(--primary-color)] w-full h-[50px] absolute bottom-0 left-0 md:static flex justify-center items-center p-4 md:h-[100dvh] md:w-48 md:items-start md:justify-start">
            <button
                className="md:hidden block"
                onClick={() => toggleMobileMenu()}
            >
                <i className={"pi pi-bars text-lg"}></i>
            </button>
            <ul className="hidden gap-2 md:p-0 p-4 flex-col w-full md:h-full absolute mb-[50px] md:mb-0 bottom-0 left-0 translate-x-[-100%] md:translate-x-[0%] md:relative md:bg-transparent md:flex bg-[var(--surface-b)] menuList z-10">
                <div className="w-full items-center justify-center hidden md:flex">
                    <Link href={"/dashboard"}>
                        <Logo estilos="text-2xl" />
                    </Link>
                </div>
                {usuario?.es_admin === 0 ? null : (
                    <MenuLink
                        prop={{
                            icon: "pi pi-user-edit",
                            name: "Administrador",
                            link: "/dashboard/admin",
                        }}
                    />
                )}

                {prop.map((opcion, index) => {
                    return <MenuLink prop={opcion} key={index} />;
                })}
                <MenuLink
                    prop={{
                        icon: "pi pi-sign-out",
                        name: "Salir",
                        link: "https://www.appgestor.es/",
                        className: "md:bottom-0 md:absolute",
                    }}
                />
            </ul>
        </aside>
    );
}
