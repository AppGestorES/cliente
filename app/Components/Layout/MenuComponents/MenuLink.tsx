"use client";

import { MenuProps } from "@/app/interfaces/MenuInterfaces";
import Link from "next/link";

interface Props {
    prop: MenuProps;
}

const MenuLink: React.FC<Props> = ({ prop }) => {
    return (
        <li>
            <Link
                className={
                    "flex gap-2 items-center hover:bg-[var(--primary-color)] transition-all w-full p-2 rounded-[var(--border-radius)] " +
                    prop.className
                }
                href={prop.link}
            >
                <i className={prop.icon + " text-lg"}></i>
                <span>{prop.name}</span>
            </Link>
        </li>
    );
};

export default MenuLink;
