"use client";

import {
    postEntradaProductos,
    putEntradaProductos,
} from "@/app/redux/slices/entradaProductosSlice";
import { AppDispatch } from "@/app/redux/store";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    EntradaDeProductos,
    putEntradasInterface,
} from "@/app/interfaces/EntradaProductos";
import { FloatLabel } from "primereact/floatlabel";

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    selectedProduct: EntradaDeProductos | null;
}

const ModalEntradaProductos: React.FC<Props> = ({
    visible,
    setVisible,
    selectedProduct,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const [producto, setProducto] = useState("");
    const [productoFinalId, setProductoFinalId] = useState("");
    const [fecha, setFecha] = useState<Nullable<Date>>(null);
    const [proveedor, setProveedor] = useState("");
    const [albaran, setAlbaran] = useState("");
    const [lote, setLote] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [fechaCaducidad, setFechaCaducidad] = useState<Nullable<Date>>(null);
    const [envasado, setEnvasado] = useState("");
    const [operario, setOperario] = useState("");

    useEffect(() => {
        if (selectedProduct) {
            setProducto(selectedProduct.producto_final_id?.toString() || "");
            setProductoFinalId(
                selectedProduct.producto_final_id?.toString() || ""
            );
            setFecha(new Date(selectedProduct.fecha_entrada * 1000));
            setProveedor(selectedProduct.proveedor || "");
            setAlbaran(selectedProduct.numero_albaran || "");
            setLote(selectedProduct.numero_lote || "");
            setCantidad(selectedProduct.cantidad_kg.toString());
            setFechaCaducidad(
                selectedProduct.fecha_caducidad
                    ? new Date(selectedProduct.fecha_caducidad * 1000)
                    : null
            );
            setEnvasado(selectedProduct.envasado_id?.toString() || "");
            setOperario(selectedProduct.operario_id?.toString() || "");
        } else {
            clearModalForm();
        }
    }, [selectedProduct]);

    const clearModalForm = () => {
        setProducto("");
        setProductoFinalId("");
        setFecha(null);
        setProveedor("");
        setAlbaran("");
        setLote("");
        setCantidad("");
        setFechaCaducidad(null);
        setEnvasado("");
        setOperario("");
    };

    const handleSubmit = () => {
        const newEntradaProducto: Omit<EntradaDeProductos, "id"> = {
            producto_final_id: parseInt(productoFinalId, 10),
            fecha_entrada: fecha ? Math.floor(fecha.getTime() / 1000) : 0,
            proveedor: proveedor,
            numero_albaran: albaran,
            numero_lote: lote,
            cantidad_kg: parseFloat(cantidad),
            fecha_caducidad: fechaCaducidad
                ? Math.floor(fechaCaducidad.getTime() / 1000)
                : 0,
            envasado_id: envasado ? parseInt(envasado, 10) : 0,
            operario_id: operario ? parseInt(operario, 10) : 0,
            id_proyecto: 1,
        };

        if (selectedProduct) {
            const updatedProduct: putEntradasInterface = {
                ...newEntradaProducto,
                id: selectedProduct.id,
            };
            dispatch(
                putEntradaProductos({
                    id: selectedProduct.id,
                    updatedProduct,
                })
            );
        } else {
            dispatch(postEntradaProductos(newEntradaProducto));
        }

        setVisible(false);
        clearModalForm();
    };

    const footerContent = (
        <div className="flex gap-2">
            <Button
                type="submit"
                label={selectedProduct ? "Guardar cambios" : "Añadir"}
                icon="pi pi-check"
                onClick={handleSubmit}
                className="mt-2 bg-[var(--primary-color)] p-2"
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={() => {
                    setVisible(false);
                    clearModalForm();
                }}
                className="mt-2 hover:bg-[var(--red-400)] p-2"
            />
        </div>
    );

    return (
        <Dialog
            header={selectedProduct ? "Editar producto" : "Añadir producto"}
            footer={footerContent}
            visible={visible}
            className="bg-[var(--surface-c)]"
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            onHide={() => {
                setVisible(false);
                clearModalForm();
            }}
        >
            <form className="w-full grid gap-6 p-5">
                <div className="flex flex-col gap-2 sm:flex-row">
                    <FloatLabel>
                        <InputText
                            id="producto"
                            value={producto}
                            className="p-inputtext p-component p-2"
                            onChange={(e) => setProducto(e.target.value)}
                        />
                        <label htmlFor="producto">Producto *</label>
                    </FloatLabel>
                    <Calendar
                        value={fecha}
                        onChange={(e: any) => setFecha(e.target.value)}
                        placeholder="Fecha de entrada *"
                        dateFormat="dd/mm/yy"
                        showIcon
                        showButtonBar
                        className="p-calendar p-component"
                    />
                    <FloatLabel>
                        <InputText
                            id="productoFinalId"
                            value={productoFinalId}
                            className="p-inputtext p-component p-2"
                            onChange={(e) => setProductoFinalId(e.target.value)}
                        />
                        <label htmlFor="productoFinalId">
                            ID del Producto Final *
                        </label>
                    </FloatLabel>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <FloatLabel>
                        <InputText
                            id="proveedor"
                            value={proveedor}
                            className="p-inputtext p-component p-2"
                            onChange={(e) => setProveedor(e.target.value)}
                        />
                        <label htmlFor="proveedor">Proveedor *</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            id="albaran"
                            keyfilter="int"
                            value={albaran}
                            className="p-inputtext p-component p-2"
                            onChange={(e) => setAlbaran(e.target.value)}
                        />
                        <label htmlFor="albaran">Número de albaran *</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            id="lote"
                            keyfilter="int"
                            value={lote}
                            className="p-inputtext p-component p-2"
                            onChange={(e) => setLote(e.target.value)}
                        />
                        <label htmlFor="lote">Número de lote *</label>
                    </FloatLabel>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <FloatLabel>
                        <InputText
                            id="cantidad"
                            keyfilter="int"
                            value={cantidad}
                            className="p-inputtext p-component p-2"
                            onChange={(e) => setCantidad(e.target.value)}
                        />
                        <label htmlFor="cantidad">Cantidad *</label>
                    </FloatLabel>
                    <Calendar
                        value={fechaCaducidad}
                        onChange={(e: any) => setFechaCaducidad(e.target.value)}
                        placeholder="Fecha de caducidad *"
                        dateFormat="dd/mm/yy"
                        showIcon
                        showButtonBar
                        className="p-calendar p-component"
                    />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <FloatLabel>
                        <InputText
                            id="envasado"
                            value={envasado}
                            className="p-inputtext p-component p-2"
                            onChange={(e) => setEnvasado(e.target.value)}
                        />
                        <label htmlFor="envasado">Envasado *</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            id="operario"
                            value={operario}
                            className="p-inputtext p-component p-2"
                            onChange={(e) => setOperario(e.target.value)}
                        />
                        <label htmlFor="operario">Operario *</label>
                    </FloatLabel>
                </div>
            </form>
        </Dialog>
    );
};

export default ModalEntradaProductos;
