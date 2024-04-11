"use client";
import { MenuProps } from "@/app/interfaces/MenuInterfaces";
import Link from "next/link";
import { MenuLink } from "./MenuComponents/MenuLink";

interface Props {
    prop: MenuProps[];
}

const Menu: React.FC<Props> = ({ prop }) => {
    return (
        <aside className="menu bg-[var(--surface-c)] w-full h-[50px] absolute bottom-0 left-0 md:static flex justify-center items-center p-4 md:h-[100dvh] md:w-36 md:items-start md:justify-start">
            <ul className="flex gap-2 md:flex-col md:w-full md:h-full relative">
                {prop.map((opcion, index) => {
                    return <MenuLink prop={opcion} key={index} />;
                })}
            </ul>
        </aside>
    );
};

export default Menu;
