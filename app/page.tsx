"use client";
import Menu from "@/app/components/Layout/Menu";
import { MenuProps } from "./interfaces/MenuInterfaces";
import ToggleTheme from "./components/ToggleTheme";

export default function Home() {
    const opciones: MenuProps[] = [
        {
            icon: "pi pi-home",
            name: "Home",
            link: "/",
        },
        {
            icon: "pi pi-user",
            name: "Usuarios",
            link: "/prueba",
        },
        {
            icon: "pi pi-sign-out",
            name: "Salir",
            link: "/prueba",
            className: "absolute bottom-0",
        },
    ];
    return (
        <div>
            <Menu prop={opciones} />
        </div>
    );
}
