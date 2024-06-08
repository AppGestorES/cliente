import Link from "next/link";
import { Avatar } from "primereact/avatar";

const Header = () => {
    return (
        <header className="flex w-full h-[50px] border-b-2 border-b-[var(--primary-color)] px-4">
            <div className="flex justify-end items-center w-full gap-2">
                <Link href={"/profile"}>
                    <span>Profile</span>
                </Link>
                <Avatar label="P" size="normal" shape="circle" />
            </div>
        </header>
    );
};

export default Header;
