"use client";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Nullable } from "primereact/ts-helpers";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
// import { postControlMateriaPrima } from "@/app/redux/slice/apiSlice"; // Placeholder import

interface ModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const ModalControlMateriaPrima: React.FC<ModalProps> = ({
    visible,
    setVisible,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const [producto, setProducto] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [fechaGenerado, setFechaGenerado] = useState<Nullable<Date>>(null);
    const [cantidadGenerada, setCantidadGenerada] = useState("");
    const [fechaRealizado, setFechaRealizado] = useState<Nullable<Date>>(null);
    const [cantidadRealizada, setCantidadRealizada] = useState("");
    const [numeroLote, setNumeroLote] = useState("");
    const [informe, setInforme] = useState("");

    const clearForm = () => {
        setProducto("");
        setProveedor("");
        setFechaGenerado(null);
        setCantidadGenerada("");
        setFechaRealizado(null);
        setCantidadRealizada("");
        setNumeroLote("");
        setInforme("");
    };

    const handleSubmit = () => {
        const newControl = {
            producto,
            proveedor,
            fecha_generado: fechaGenerado
                ? Math.floor(fechaGenerado.getTime() / 1000)
                : 0,
            cantidad_generada: parseFloat(cantidadGenerada),
            fecha_realizado: fechaRealizado
                ? Math.floor(fechaRealizado.getTime() / 1000)
                : 0,
            cantidad_realizada: parseFloat(cantidadRealizada),
            numero_lote: numeroLote,
            informe,
        };
        // dispatch(postControlMateriaPrima(newControl)); // Placeholder dispatch
        setVisible(false);
        clearForm();
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
        <Dialog
            header="Análisis de control de materia prima"
            visible={visible}
            onHide={() => setVisible(false)}
            footer={footerContent}
        >
            <form className="w-full grid gap-2">
                <InputText
                    value={proveedor}
                    onChange={(e) => setProveedor(e.target.value)}
                    placeholder="Proveedor"
                    className="w-full p-2"
                />
                <InputText
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                    placeholder="Producto"
                    className="w-full p-2"
                />
                <div className="flex gap-2">
                    <Calendar
                        value={fechaGenerado}
                        onChange={(e) => setFechaGenerado(e.value)}
                        placeholder="Generado en"
                        dateFormat="dd/mm/yy"
                        showIcon
                        className="w-1/2"
                    />
                    <InputText
                        value={cantidadGenerada}
                        onChange={(e) => setCantidadGenerada(e.target.value)}
                        placeholder="Cantidad acumulada (kg)"
                        className="w-1/2 p-2"
                    />
                </div>
                <div className="flex gap-2">
                    <Calendar
                        value={fechaRealizado}
                        onChange={(e) => setFechaRealizado(e.value)}
                        placeholder="Realizado en"
                        dateFormat="dd/mm/yy"
                        showIcon
                        className="w-1/2"
                    />
                    <InputText
                        value={cantidadRealizada}
                        onChange={(e) => setCantidadRealizada(e.target.value)}
                        placeholder="Cantidad acumulada (kg)"
                        className="w-1/2 p-2"
                    />
                    <InputText
                        value={numeroLote}
                        onChange={(e) => setNumeroLote(e.target.value)}
                        placeholder="Número de lote"
                        className="w-1/2 p-2"
                    />
                </div>
                <InputText
                    value={informe}
                    onChange={(e) => setInforme(e.target.value)}
                    placeholder="Informe"
                    className="w-full p-2"
                />
            </form>
        </Dialog>
    );
};

export default ModalControlMateriaPrima;
