"use client";

import { getUsuario } from "@/app/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import withAuth from "../withAuth";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { useState } from "react";

const Perfil = () => {
    const usuario = useSelector((state: RootState) => getUsuario(state));
    const [username, setUsername] = useState<string | undefined | null>(
        usuario?.identificador
    );
    const [name, setName] = useState<string | undefined | null>(
        usuario?.nombre
    );

    return (
        <div>
            <h2 className="text-xl">Bienvenido {usuario?.nombre}</h2>

            <hr className="my-4 border-gray-600" />

            <h2 className="text-lg">Informacion de la cuenta</h2>
            <div className="mt-8 flex gap-2 flex-col">
                <div className="flex flex-col ">
                    <label htmlFor="username" className="text-sm">
                        Nombre de usuario
                    </label>
                    <div className="p-inputgroup w-full md:w-1/2">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText
                            placeholder="Nombre de usuario"
                            value={username!}
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="username" className="text-sm">
                        Nombre
                    </label>
                    <div className="p-inputgroup w-full md:w-1/2">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText
                            placeholder="Nombre de usuario"
                            value={name!}
                            id="username"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Perfil);
