"use client";

import { postUsuariosInterface } from "@/app/interfaces/Usuario";
import { fetchUsuarios, postUsuarios } from "@/app/redux/slices/userSlice";
import { AppDispatch } from "@/app/redux/store";
import { sha256 } from "js-sha256";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const ModalUsuarios = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const toast = useRef<Toast>(null);

    const [id, setId] = useState<number>(0);
    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");
    const [identificador, setIdentificador] = useState<string>("");

    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = () => {
        const addUsuario: postUsuariosInterface = {
            nombre: nombre,
            apellido: apellido,
            contrasena: sha256(contrasena),
            identificador: identificador,
        };

        dispatch(postUsuarios(addUsuario)).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                toast.current?.show({
                    severity: "success",
                    summary: "Agregado",
                    detail: "Agregado con éxito",
                });
                dispatch(fetchUsuarios());
                setVisible(false);
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Agregado",
                    detail: "Error al agregar",
                });
            }
        });
    };

    const footerContent = (
        <div className="flex justify-center">
            <Button
                type="submit"
                label="Guardar"
                icon="pi pi-check"
                onClick={handleSubmit}
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
                severity="danger"
            />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} position="bottom-right" />
            <Button
                label="Añadir usuario"
                icon="pi pi-plus"
                onClick={() => setVisible(true)}
            />
            <Dialog
                header="Añadir"
                footer={footerContent}
                visible={visible}
                className="bg-[var(--surface-c)]"
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => setVisible(false)}
            >
                <form className="w-full grid grid-cols-3 gap-6 p-5 modalForm">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="userId"
                                value={nombre!}
                                onChange={(e) => setNombre(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                Nombre del usuario
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="userId"
                                value={apellido!}
                                onChange={(e) => setApellido(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                Apellido del usuario
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                type="password"
                                id="userId"
                                value={contrasena!}
                                onChange={(e) => setContrasena(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                Contraseña del usuario
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="userId"
                                value={identificador!}
                                onChange={(e) =>
                                    setIdentificador(e.target.value)
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                Identificador del usuario
                            </label>
                        </FloatLabel>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default ModalUsuarios;
