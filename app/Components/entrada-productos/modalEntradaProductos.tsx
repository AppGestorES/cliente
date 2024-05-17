"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const ModalEntradaProductos: React.FC<Props> = ({ visible, setVisible }) => {
    const [localVisible, setLocalVisible] = useState(visible);
    const [producto, setProducto] = useState("");
    const [fecha, setFecha] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [albaran, setAlbaran] = useState("");
    const [lote, setLote] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [fechaCaducidad, setFechaCaducidad] = useState("");
    const [humedad, setHumedad] = useState("");
    const [envasado, setEnvasado] = useState("");
    const [operario, setOperario] = useState("");

    const clearModalForm = () => {
        setProducto("");
        setFecha("");
        setProveedor("");
        setAlbaran("");
        setLote("");
        setCantidad("");
        setFechaCaducidad("");
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
                className="p-2 bg-[var(--primary-color)] mt-2"
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
                className="p-2 bg-[var(--surface-c)] mt-2"
            />
        </div>
    );

    return (
        <Dialog
            header="Añadir producto"
            footer={footerContent}
            visible={visible}
            className="md:w-[50vw] w-full bg-[var(--surface-c)] "
            onHide={() => setVisible(false)}
        >
            <form>
                <div className="flex w-full p-2 gap-2">
                    <InputText
                        value={producto}
                        className="p-2"
                        onChange={(e) => setProducto(e.target.value)}
                        placeholder="Producto *"
                    />
                    <InputText
                        type="date"
                        value={fecha}
                        className="p-2"
                        onChange={(e) => setFecha(e.target.value)}
                        placeholder="Fecha de entrada *"
                    />
                </div>
                <div className="flex w-full p-2 gap-2">
                    <InputText
                        value={proveedor}
                        className="p-2"
                        onChange={(e) => setProveedor(e.target.value)}
                        placeholder="Proveedor *"
                    />
                    <InputText
                        keyfilter="int"
                        value={albaran}
                        className="p-2"
                        onChange={(e) => setAlbaran(e.target.value)}
                        placeholder="Número de albaran *"
                    />
                    <InputText
                        keyfilter="int"
                        value={lote}
                        className="p-2"
                        onChange={(e) => setLote(e.target.value)}
                        placeholder="Número de lote *"
                    />
                </div>
                <div className="flex w-full p-2 gap-2">
                    <InputText
                        keyfilter="int"
                        value={cantidad}
                        className="p-2"
                        onChange={(e) => setCantidad(e.target.value)}
                        placeholder="Cantidad *"
                    />
                    <InputText
                        type="date"
                        value={fechaCaducidad}
                        className="p-2"
                        onChange={(e) => setFechaCaducidad(e.target.value)}
                        placeholder="Fecha de caducidad"
                    />
                    <InputText
                        keyfilter="int"
                        value={humedad}
                        className="p-2"
                        onChange={(e) => setHumedad(e.target.value)}
                        placeholder="Humedad *"
                    />
                </div>
                <div className="flex w-full p-2 gap-2">
                    <InputText
                        value={envasado}
                        className="p-2"
                        onChange={(e) => setEnvasado(e.target.value)}
                        placeholder="Envasado *"
                    />
                    <InputText
                        value={operario}
                        className="p-2"
                        onChange={(e) => setOperario(e.target.value)}
                        placeholder="Operario *"
                    />
                </div>
            </form>
        </Dialog>
    );
};

export default ModalEntradaProductos;