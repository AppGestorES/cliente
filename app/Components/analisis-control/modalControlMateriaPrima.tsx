"use client";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Nullable } from "primereact/ts-helpers";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import {
    postMateriasPrimas,
    fetchMateriasPrimas,
} from "@/app/redux/slices/controlMateriaPrimaSlice";
import { Toast } from "primereact/toast";

interface ModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    toast: React.RefObject<Toast>;
}

const ModalControlMateriaPrima: React.FC<ModalProps> = ({
    visible,
    setVisible,
    toast,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const [nombre, setNombre] = useState("");
    const [caducidad, setCaducidad] = useState<Nullable<Date>>(null);
    const [stockKgs, setStockKgs] = useState("");
    const [idProyecto, setIdProyecto] = useState("");

    const clearForm = () => {
        setNombre("");
        setCaducidad(null);
        setStockKgs("");
        setIdProyecto("");
    };

    const handleSubmit = () => {
        const newMateriaPrima = {
            nombre,
            caducidad: caducidad ? Math.floor(caducidad.getTime() / 1000) : 0,
            stock_kgs: parseFloat(stockKgs),
            id_proyecto: parseInt(idProyecto, 10),
        };
        dispatch(postMateriasPrimas(newMateriaPrima)).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
                toast.current?.show({
                    severity: "success",
                    summary: "Creación Exitosa",
                    detail: "La materia prima fue agregada",
                    life: 3000,
                });
                dispatch(fetchMateriasPrimas());
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Error al Crear",
                    detail: "Hubo un error al agregar la materia prima",
                    life: 3000,
                });
            }
            setVisible(false);
            clearForm();
        });
    };

    const footerContent = (
        <div className="flex gap-2">
            <Button
                type="submit"
                label="Añadir"
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
        <div>
            <Dialog
                header="Añadir Materia Prima"
                visible={visible}
                onHide={() => setVisible(false)}
                footer={footerContent}
            >
                <form className="w-full grid gap-2">
                    <InputText
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre"
                        className="w-full p-2"
                    />
                    <div className="flex gap-2">
                        <Calendar
                            value={caducidad}
                            onChange={(e) => setCaducidad(e.value)}
                            placeholder="Caducidad"
                            dateFormat="dd/mm/yy"
                            showIcon
                            className="w-1/2"
                            showButtonBar
                        />
                        <InputText
                            value={stockKgs}
                            onChange={(e) => setStockKgs(e.target.value)}
                            placeholder="Stock (kg)"
                            className="w-1/2 p-2"
                        />
                    </div>
                    <InputText
                        value={idProyecto}
                        onChange={(e) => setIdProyecto(e.target.value)}
                        placeholder="ID Proyecto"
                        className="w-full p-2"
                    />
                </form>
            </Dialog>
        </div>
    );
};

export default ModalControlMateriaPrima;
