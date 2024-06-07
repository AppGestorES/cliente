import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import {
    materiasPrimasInterface,
    postMateriasPrimasInterface,
} from "@/app/interfaces/MateriasPrimas";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import {
    fetchMateriasPrimas,
    postMateriasPrimas,
} from "@/app/redux/slices/controlMateriaPrimaSlice";

const CreateMateriaPrimaModal = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();
    const [nombre, setNombre] = useState<string>("");
    const [caducidad, setCaducidad] = useState<Date | null>(null);
    const [stockKgs, setStockKgs] = useState<number>(0);
    const [idProyecto, setIdProyecto] = useState<number>(0);

    const handleSubmit = () => {
        if (caducidad) {
            const materiaPrima: postMateriasPrimasInterface = {
                nombre,
                caducidad: caducidad.getTime() / 1000,
                stock_kgs: stockKgs,
                id_proyecto: idProyecto,
            };

            try {
                dispatch(postMateriasPrimas(materiaPrima));
                dispatch(fetchMateriasPrimas());
                setVisible(false);
            } catch (error) {
                console.error("Error");
            }
        }
    };

    const footerContent = (
        <div className="flex gap-2">
            <Button
                label="Guardar"
                icon="pi pi-check"
                onClick={handleSubmit}
                className="mt-2 bg-[var(--primary-color)] p-2"
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
                className="mt-2 hover:bg-[var(--red-400)] p-2"
            />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Button
                label="Añadir producto"
                icon="pi pi-external-link"
                onClick={() => setVisible(true)}
                className="bg-[var(--surface-a)] p-2 hover:bg-[var(--primary-color)] mt-2 max-w-[300px]"
            />
            <Dialog
                header="Añadir"
                footer={footerContent}
                visible={visible}
                className="bg-[var(--surface-c)]"
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => setVisible(false)}
            >
                <form className="w-full grid grid-cols-1 md:grid-cols-3 p-5 gap-6">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="producto_final_id"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID del Producto Final
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Calendar
                            value={caducidad}
                            onChange={(e: any) => setCaducidad(e.value)}
                            placeholder="Fecha de entrada"
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
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="stockKgs">Stock (kg)</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="idProyecto"
                                value={idProyecto.toString()}
                                onChange={(e) =>
                                    setIdProyecto(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="idProyecto">ID Proyecto</label>
                        </FloatLabel>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default CreateMateriaPrimaModal;
