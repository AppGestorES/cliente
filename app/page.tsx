"use client";
import Menu from "@/app/components/Layout/Menu";
import { MenuProps } from "./interfaces/MenuInterfaces";

export default function Home() {
    const opciones: MenuProps[] = [
        {
            icon: "",
            name: "nombre 1",
            link: "/",
        },
        {
            icon: "",
            name: "nombre 2",
            link: "/prueba",
        },
    ];
    return <Menu prop={opciones} />;
}
