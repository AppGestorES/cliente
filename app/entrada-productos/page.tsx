"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { z } from "zod";

const invalid_type_error = "Invalid type provided for this field";
const required_error = "This field cannot be blank";

export const FormSchema = z.object({
    producto: z
        .string({ invalid_type_error, required_error })
        .min(1, { message: required_error }),
});

export default function EntradaProductos() {
    const [visible, setVisible] = useState(false);
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

    const handleSubmit = () => {
        return true;
    };

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
        <div>
            <h2 className="text-xl">Entrada de Productos</h2>
            <Button
                label="Añadir producto"
                icon="pi pi-plus"
                className="bg-[var(--surface-c)] p-2 hover:bg-[var(--primary-color)] mt-2"
                onClick={() => setVisible(true)}
            />
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
        </div>
    );
}
