"use client";

import { MenuProps } from "@/app/interfaces/MenuInterfaces";
import MenuLink from "@/app/Components/Layout/MenuComponents/MenuLink";

const prop: MenuProps[] = [
    {
        icon: "pi pi-box", // Assuming a relevant icon
        name: "Entrada de productos",
        link: "/entrada-productos",
    },
    {
        icon: "pi pi-chart-line", // Assuming a relevant icon
        name: "Análisis de control",
        link: "/analisis-control",
    },
    {
        icon: "pi pi-bell", // Assuming a relevant icon
        name: "Alertas de stock",
        link: "/alertas-stock",
    },
    {
        icon: "pi pi-exclamation-triangle", // Assuming a relevant icon
        name: "Alertas de caducidad",
        link: "/alertas-caducidad",
    },
    {
        icon: "pi pi-external-link", // Assuming a relevant icon
        name: "Salida de productos",
        link: "/salida-productos",
    },
    {
        icon: "pi pi-chart-bar", // Assuming a relevant icon again for análisis
        name: "Análisis de control",
        link: "/analisis-control",
    },
    {
        icon: "pi pi-stack", // Assuming a relevant icon
        name: "Materias primas",
        link: "/materias-primas",
    },
    {
        icon: "pi pi-calculator", // Assuming a relevant icon
        name: "Fórmulas",
        link: "/formulas",
    },
    {
        icon: "pi pi-book", // Assuming a relevant icon
        name: "Productos finales",
        link: "/productos-finales",
    },
    {
        icon: "pi pi-search", // Assuming a relevant icon
        name: "Trazabilidad",
        link: "/trazabilidad",
    },
    {
        icon: "pi pi-cog", // Assuming a relevant icon
        name: "Configuración",
        link: "/configuracion",
    },
    {
        icon: "pi pi-file", // Assuming a relevant icon
        name: "Registro de actividad",
        link: "/registro-actividad",
    },
    {
        icon: "pi pi-shield", // Assuming a relevant icon
        name: "Acerca de",
        link: "/acerca-de",
    },
];

const Menu = () => {
    const toggleMobileMenu = () => {
        const menuList = document.querySelector<HTMLUListElement>(".menuList");
        menuList?.classList.toggle("hidden");
        menuList?.classList.toggle("translate-x-[0%]");
        if (!menuList?.classList.contains("flex")) {
            menuList?.classList.add("flex");
        }
    };

    return (
        <aside className="menu bg-[var(--surface-a)] w-full h-[50px] absolute bottom-0 left-0 md:static flex justify-center items-center p-4 md:h-[100dvh] md:w-48 md:items-start md:justify-start">
            <button
                className="md:hidden block"
                onClick={() => toggleMobileMenu()}
            >
                <i className={"pi pi-bars text-lg"}></i>
            </button>
            <ul className="hidden gap-2 md:p-0 p-4 flex-col w-full md:h-full absolute mb-[50px] md:mb-0 bottom-0 left-0 translate-x-[-100%] md:translate-x-[0%] md:relative md:bg-transparent md:flex bg-[var(--surface-c)] menuList">
                {prop.map((opcion, index) => {
                    return <MenuLink prop={opcion} key={index} />;
                })}
                <MenuLink
                    prop={{
                        icon: "pi pi-sign-out",
                        name: "Salir",
                        link: "/",
                        className: "md:bottom-0 md:absolute",
                    }}
                />
            </ul>
        </aside>
    );
};

export default Menu;
