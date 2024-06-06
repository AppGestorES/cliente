import React, { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import {
    materiasPrimasInterface,
    putMateriasPrimasInterface,
} from "@/app/interfaces/MateriasPrimas";
import {
    fetchMateriasPrimas,
    putMateriasPrimas,
} from "@/app/redux/slices/controlMateriaPrimaSlice";

interface Props {
    materiaPrima: materiasPrimasInterface;
    onHide: () => void;
}

const EditMateriaPrimaModal: React.FC<Props> = ({ materiaPrima, onHide }) => {
    const [visible, setVisible] = useState<boolean>(true);
    const [nombre, setNombre] = useState<string>(materiaPrima.nombre);
    const [caducidad, setCaducidad] = useState<Date | null>(
        new Date(materiaPrima.caducidad * 1000)
    );
    const [stockKgs, setStockKgs] = useState<number>(materiaPrima.stock_kgs);
    const [idProyecto, setIdProyecto] = useState<number>(
        materiaPrima.proyecto.id
    );
    const toast = useRef<Toast>(null);
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = () => {
        if (caducidad) {
            const updatedProduct: putMateriasPrimasInterface = {
                id: materiaPrima.id,
                nombre: nombre,
                caducidad: caducidad.getTime() / 1000,
                stock_kgs: stockKgs,
                id_proyecto: idProyecto,
            };
            dispatch(putMateriasPrimas(updatedProduct)).then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    toast.current?.show({
                        severity: "success",
                        summary: "Actualización Exitosa",
                        detail: "La materia prima fue actualizada",
                        life: 3000,
                    });
                    setVisible(false);
                    dispatch(fetchMateriasPrimas());
                    onHide();
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error al Actualizar",
                        detail: "Hubo un error al actualizar la materia prima",
                        life: 3000,
                    });
                }
            });
        }
    };

    const footerContent = (
        <div className="flex gap-2">
            <Button
                type="submit"
                label="Guardar"
                icon="pi pi-check"
                onClick={handleSubmit}
                className="mt-2 bg-[var(--primary-color)] p-2"
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={() => {
                    setVisible(false);
                    onHide();
                }}
                className="mt-2 hover:bg-[var(--red-400)] p-2"
            />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
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
                <form className="w-full grid grid-cols-3 gap-6 p-5">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="nombre">Nombre</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Calendar
                            id="caducidad"
                            value={caducidad}
                            onChange={(e: any) => setCaducidad(e.value)}
                            placeholder="Caducidad"
                            dateFormat="dd/mm/yy"
                            showButtonBar
                            className="p-calendar p-component"
                        />
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="stockKgs"
                                value={stockKgs.toString()}
                                onChange={(e: any) =>
                                    setStockKgs(parseInt(e.target.value))
                                }
                                className="p-inputnumber p-component p-2"
                            />
                            <label htmlFor="stockKgs">Stock (kg)</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="idProyecto"
                                value={idProyecto.toString()}
                                onChange={(e: any) =>
                                    setIdProyecto(parseInt(e.target.value))
                                }
                                className="p-inputnumber p-component p-2"
                            />
                            <label htmlFor="idProyecto">ID Proyecto</label>
                        </FloatLabel>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default EditMateriaPrimaModal;
