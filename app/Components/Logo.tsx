"use client";

interface props {
    estilos: string;
}

const Logo: React.FC<props> = ({ estilos }) => {
    return (
        <h2 className={estilos}>
            App<span className="text-[#5472d4]">Gestor</span>
        </h2>
    );
};

export default Logo;
