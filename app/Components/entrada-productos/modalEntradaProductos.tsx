"use client";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import { useEffect, useState } from "react";

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const ModalEntradaProductos: React.FC<Props> = ({ visible, setVisible }) => {
    const [localVisible, setLocalVisible] = useState(visible);
    const [producto, setProducto] = useState("");
    const [fecha, setFecha] = useState<Nullable<Date>>(null);
    const [proveedor, setProveedor] = useState("");
    const [albaran, setAlbaran] = useState("");
    const [lote, setLote] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [fechaCaducidad, setFechaCaducidad] = useState<Nullable<Date>>(null);
    const [humedad, setHumedad] = useState("");
    const [envasado, setEnvasado] = useState("");
    const [operario, setOperario] = useState("");

    const clearModalForm = () => {
        setProducto("");
        setFecha(null);
        setProveedor("");
        setAlbaran("");
        setLote("");
        setCantidad("");
        setFechaCaducidad(null);
        setHumedad("");
        setEnvasado("");
        setOperario("");
    };

    useEffect(() => {
        setLocalVisible(visible);
    }, [visible]);

    const handleSubmit = () => {
        return true;
    };

    const footerContent = (
        <div className="flex gap-2">
            <Button
                type="submit"
                label="Añadir"
                icon="pi pi-check"
                onClick={() => {
                    if (handleSubmit()) {
                        setVisible(false);
                        clearModalForm();
                    }
                }}
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
            header="Añadir producto"
            footer={footerContent}
            visible={visible}
            className="bg-[var(--surface-c)]"
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            onHide={() => setVisible(false)}
        >
            <form className="w-full grid gap-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                    <InputText
                        value={producto}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setProducto(e.target.value)}
                        placeholder="Producto *"
                    />
                    <Calendar
                        value={fecha}
                        onChange={(e: any) => setFecha(e.target.value)}
                        placeholder="Fecha de entrada *"
                        dateFormat="dd/mm/yy"
                        showIcon
                        showButtonBar
                        className="p-calendar p-component"
                    />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <InputText
                        value={proveedor}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setProveedor(e.target.value)}
                        placeholder="Proveedor *"
                    />
                    <InputText
                        keyfilter="int"
                        value={albaran}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setAlbaran(e.target.value)}
                        placeholder="Número de albaran *"
                    />
                    <InputText
                        keyfilter="int"
                        value={lote}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setLote(e.target.value)}
                        placeholder="Número de lote *"
                    />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <InputText
                        keyfilter="int"
                        value={cantidad}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setCantidad(e.target.value)}
                        placeholder="Cantidad *"
                    />
                    <Calendar
                        value={fechaCaducidad}
                        onChange={(e: any) => setFechaCaducidad(e.target.value)}
                        placeholder="Fecha de caducidad *"
                        dateFormat="dd/mm/yy"
                        showIcon
                        showButtonBar
                        className="p-calendar p-component"
                    />
                    <InputText
                        keyfilter="int"
                        value={humedad}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setHumedad(e.target.value)}
                        placeholder="Humedad *"
                    />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <InputText
                        value={envasado}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setEnvasado(e.target.value)}
                        placeholder="Envasado *"
                    />
                    <InputText
                        value={operario}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setOperario(e.target.value)}
                        placeholder="Operario *"
                    />
                </div>
            </form>
        </Dialog>
    );
};

export default ModalEntradaProductos;
