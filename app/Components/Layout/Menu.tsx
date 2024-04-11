"use client";
import { MenuProps } from "@/app/interfaces/MenuInterfaces";
import Link from "next/link";

interface Props {
    prop: MenuProps[];
}

const Menu: React.FC<Props> = ({ prop }) => {
    return (
        <aside className="menu bg-slate-400 w-full h-[50px] absolute bottom-0 left-0 md:static">
            <ul>
                {prop.map((opcion, index) => {
                    return (
                        <li key={index}>
                            <Link href={opcion.link}>{opcion.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Menu;
