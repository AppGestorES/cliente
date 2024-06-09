"use client";

import {
    UsuarioInterface,
    putUsuariosInterface,
} from "@/app/interfaces/Usuario";
import { fetchUsuarios, putUsuarios } from "@/app/redux/slices/userSlice";
import { AppDispatch } from "@/app/redux/store";
import { sha256 } from "js-sha256";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
    usuarios: UsuarioInterface;
    onHide: () => void;
}

const EditUsuarioModal: React.FC<Props> = ({ usuarios, onHide }) => {
    const [visible, setVisible] = useState<boolean>(true);
    const toast = useRef<Toast>(null);
    const [id, setId] = useState<number>(usuarios.id);
    const [nombre, setNombre] = useState<string>(usuarios.nombre);
    const [apellido, setApellido] = useState<string>(usuarios.apellido);
    const [contrasena, setContrasena] = useState<string>("");
    const [identificador, setIdentificador] = useState<string>(
        usuarios.identificador
    );
    const [id_proyecto, setIdProyecto] = useState<number>(
        usuarios.proyecto.id !== null ? usuarios.proyecto.id : 0
    );

    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = () => {
        const updateduser: putUsuariosInterface = {
            id: id,
            nombre: nombre,
            apellido: apellido,
            foto: "",
            contrasena: sha256(contrasena),
            identificador: identificador,
            id_proyecto: id_proyecto === 0 ? null : id_proyecto,
            es_admin: 0,
            proyecto_admin: null,
        };

        dispatch(putUsuarios(updateduser)).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
                toast.current?.show({
                    severity: "success",
                    summary: "Actualización Exitosa",
                    detail: "El usuario fue actualizado",
                    life: 3000,
                });
                dispatch(fetchUsuarios());
                setVisible(false);
                onHide();
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Error al Actualizar",
                    detail: "Hubo un error al actualizar el usuario",
                    life: 3000,
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
            <Dialog
                header="Editar Producto"
                footer={footerContent}
                visible={visible}
                className="bg-[var(--surface-c)]"
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => {
                    setVisible(false);
                    onHide();
                }}
            >
                <form className="w-full grid grid-cols-3 gap-6 p-5 modalForm">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                keyfilter={"int"}
                                id="userId"
                                value={id.toString()}
                                onChange={(e) =>
                                    setId(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID del usuario
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="userId"
                                value={nombre}
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
                                value={apellido}
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
                                value={contrasena}
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
                                value={identificador}
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
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                keyfilter={"int"}
                                id="userId"
                                value={id_proyecto.toString()}
                                onChange={(e) =>
                                    setIdProyecto(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                Id de proyecto
                            </label>
                        </FloatLabel>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default EditUsuarioModal;
