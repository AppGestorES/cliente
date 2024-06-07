import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { postEntradasInterface } from "@/app/interfaces/EntradaProductos";
import {
    fetchEntradaProductos,
    postEntradaProductos,
} from "@/app/redux/slices/entradaProductosSlice";

const EntradaProductosModal = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [productoFinalId, setProductoFinalId] = useState<number>(0);
    const [fechaEntrada, setFechaEntrada] = useState<Date | null>(null);
    const [proveedor, setProveedor] = useState<string>("");
    const [numeroAlbaran, setNumeroAlbaran] = useState<string>("");
    const [numeroLote, setNumeroLote] = useState<string>("");
    const [cantidadKg, setCantidadKg] = useState<number>(0);
    const [fechaCaducidad, setFechaCaducidad] = useState<Date | null>(null);
    const [envasadoId, setEnvasadoId] = useState<number>(0);
    const [operarioId, setOperarioId] = useState<number>(0);
    const [idProyecto, setIdProyecto] = useState<number>(0);
    const toast = useRef<Toast>(null);
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = () => {
        const addProduct: postEntradasInterface = {
            producto_final_id: productoFinalId,
            fecha_entrada: fechaEntrada ? fechaEntrada.getTime() / 1000 : 0,
            proveedor: proveedor,
            numero_albaran: numeroAlbaran,
            numero_lote: numeroLote,
            cantidad_kg: cantidadKg,
            fecha_caducidad: fechaCaducidad
                ? fechaCaducidad.getTime() / 1000
                : 0,
            envasado_id: envasadoId,
            operario_id: operarioId,
            id_proyecto: idProyecto,
        };

        try {
            dispatch(postEntradaProductos(addProduct));
            dispatch(fetchEntradaProductos());
            setVisible(false);
        } catch (error) {
            console.error("Error");
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
                onClick={() => setVisible(false)}
                className="mt-2 hover:bg-[var(--red-400)] p-2"
            />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Button
                label="Añadir producto"
                icon="pi pi-plus"
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
                <form className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="producto_final_id"
                                value={productoFinalId.toString()}
                                onChange={(e) =>
                                    setProductoFinalId(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID del Producto Final
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Calendar
                            value={fechaEntrada}
                            onChange={(e: any) => setFechaEntrada(e.value)}
                            placeholder="Fecha de entrada"
                            dateFormat="dd/mm/yy"
                            showButtonBar
                            className="p-calendar p-component"
                        />
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="proveedor"
                                value={proveedor}
                                onChange={(e) => setProveedor(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="proveedor">Proveedor</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="numero_albaran"
                                keyfilter={"int"}
                                value={numeroAlbaran}
                                onChange={(e) =>
                                    setNumeroAlbaran(e.target.value)
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="numero_albaran">
                                Número de albarán
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="numero_lote"
                                value={numeroLote}
                                onChange={(e) => setNumeroLote(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="numero_lote">Número de lote</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="cantidad_kg"
                                value={cantidadKg.toString()}
                                onChange={(e) =>
                                    setCantidadKg(parseFloat(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="cantidad_kg">Cantidad (KG)</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Calendar
                            value={fechaCaducidad}
                            onChange={(e: any) => setFechaCaducidad(e.value)}
                            placeholder="Fecha de caducidad"
                            dateFormat="dd/mm/yy"
                            showButtonBar
                            className="p-calendar p-component"
                        />
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="envasado_id"
                                value={envasadoId?.toString() || ""}
                                onChange={(e) =>
                                    setEnvasadoId(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="envasado_id">ID Envasado</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="operario_id"
                                value={operarioId?.toString() || ""}
                                onChange={(e) =>
                                    setOperarioId(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="operario_id">ID Operario</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="id_proyecto"
                                value={idProyecto?.toString() || ""}
                                onChange={(e) =>
                                    setIdProyecto(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="id_proyecto">ID Proyecto</label>
                        </FloatLabel>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default EntradaProductosModal;
