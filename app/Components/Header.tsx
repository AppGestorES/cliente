"use client";

import Link from "next/link";
import { Avatar } from "primereact/avatar";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { getUsuario } from "../redux/slices/authSlice";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";

const Header = () => {
    const usuario = useSelector((state: RootState) => getUsuario(state));

    const menuLeft = useRef<Menu>(null);

    const items: MenuItem[] = [
        {
            template: () => {
                return (
                    <Link href={"/dashboard/perfil"}>
                        <div className="flex w-full items-center p-2 gap-2">
                            <i className="pi pi-user"></i>
                            <span>Perfil</span>
                        </div>
                    </Link>
                );
            },
        },
        {
            template: () => {
                return (
                    <Link
                        href={"/login"}
                        onClick={() => {
                            localStorage.removeItem("authToken");
                        }}
                    >
                        <div className="flex w-full items-center p-2 gap-2">
                            <i className="pi pi-sign-out"></i>
                            <span>Cerrar sesion</span>
                        </div>
                    </Link>
                );
            },
        },
    ];

    return (
        <header className="flex w-full h-[50px] border-b-2 border-b-[var(--primary-color)] px-4">
            <div className="flex justify-end items-center w-full">
                <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
                <Button
                    text
                    onClick={(event) => menuLeft.current?.toggle(event)}
                    className="gap-4"
                >
                    <span>{usuario?.nombre}</span>
                    <Avatar label="P" size="normal" shape="circle" />
                </Button>
            </div>
        </header>
    );
};

export default Header;
