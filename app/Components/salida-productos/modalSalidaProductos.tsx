"use client";

import { postSalidas } from "@/app/redux/slices/salidaProductosSlice";
import { AppDispatch } from "@/app/redux/store";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const ModalSalidaProductos: React.FC<Props> = ({ visible, setVisible }) => {
    const dispatch: AppDispatch = useDispatch();

    const [localVisible, setLocalVisible] = useState(visible);
    const [productoFinalId, setProductoFinalId] = useState("");
    const [formulaId, setFormulaId] = useState("");
    const [lote, setLote] = useState("");
    const [fechaSalida, setFechaSalida] = useState<Nullable<Date>>(null);
    const [cantidad, setCantidad] = useState("");
    const [fechaCaducidad, setFechaCaducidad] = useState<Nullable<Date>>(null);
    const [envasadoId, setEnvasadoId] = useState("");
    const [formatoId, setFormatoId] = useState("");
    const [destinoId, setDestinoId] = useState("");
    const [vehiculoId, setVehiculoId] = useState("");
    const [proyectoId, setProyectoId] = useState("");

    const clearModalForm = () => {
        setProductoFinalId("");
        setFormulaId("");
        setLote("");
        setFechaSalida(null);
        setCantidad("");
        setFechaCaducidad(null);
        setEnvasadoId("");
        setFormatoId("");
        setDestinoId("");
        setVehiculoId("");
        setProyectoId("");
    };

    useEffect(() => {
        setLocalVisible(visible);
    }, [visible]);

    const handleSubmit = () => {
        const newSalidaProducto = {
            producto_final_id: parseInt(productoFinalId, 10),
            formula_id: parseInt(formulaId, 10),
            numero_lote: lote,
            fecha_salida: fechaSalida
                ? Math.floor(fechaSalida.getTime() / 1000)
                : 0,
            cantidad: parseFloat(cantidad),
            fecha_caducidad: fechaCaducidad
                ? Math.floor(fechaCaducidad.getTime() / 1000)
                : undefined,
            envasado_id: envasadoId ? parseInt(envasadoId, 10) : undefined,
            formato_id: formatoId ? parseInt(formatoId, 10) : undefined,
            destino_id: destinoId ? parseInt(destinoId, 10) : undefined,
            vehiculo_id: vehiculoId ? parseInt(vehiculoId, 10) : undefined,
            id_proyecto: parseInt(proyectoId, 10),
        };
        dispatch(postSalidas(newSalidaProducto));
        setVisible(false);
        clearModalForm();
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
            header="Añadir salida"
            footer={footerContent}
            visible={visible}
            className="bg-[var(--surface-c)]"
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            onHide={() => setVisible(false)}
        >
            <form className="w-full grid gap-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                    <InputText
                        value={productoFinalId}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setProductoFinalId(e.target.value)}
                        placeholder="ID del Producto Final *"
                    />
                    <InputText
                        value={formulaId}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setFormulaId(e.target.value)}
                        placeholder="ID de la Formula *"
                    />
                    <InputText
                        value={lote}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setLote(e.target.value)}
                        placeholder="Número de lote *"
                    />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <Calendar
                        value={fechaSalida}
                        onChange={(e: any) => setFechaSalida(e.target.value)}
                        placeholder="Fecha de salida *"
                        dateFormat="dd/mm/yy"
                        showIcon
                        showButtonBar
                        className="p-calendar p-component"
                    />
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
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <InputText
                        value={envasadoId}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setEnvasadoId(e.target.value)}
                        placeholder="ID del Envasado *"
                    />
                    <InputText
                        value={formatoId}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setFormatoId(e.target.value)}
                        placeholder="ID del Formato *"
                    />
                    <InputText
                        value={destinoId}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setDestinoId(e.target.value)}
                        placeholder="ID del Destino *"
                    />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <InputText
                        value={vehiculoId}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setVehiculoId(e.target.value)}
                        placeholder="ID del Vehículo *"
                    />
                    <InputText
                        value={proyectoId}
                        className="p-inputtext p-component p-2"
                        onChange={(e) => setProyectoId(e.target.value)}
                        placeholder="ID del Proyecto *"
                    />
                </div>
            </form>
        </Dialog>
    );
};

export default ModalSalidaProductos;
