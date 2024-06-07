// export interface salidaProductosInterface {
//     id: number;
//     producto_final_id: number;
//     formula_id: number;
//     numero_lote: string;
//     fecha_salida: number;
//     cantidad: number;
//     fecha_caducidad: number;
//     envasado_id: envasadosInterface;
//     formato_id: formatosInterface;
//     destino_id: destinosInterface;
//     vehiculo_id: vehiculosInterface;
//     proyecto: proyectosInterface;
// }

import { postSalidaProductosInterface } from "@/app/interfaces/SalidaProductos";
import {
    fetchSalidas,
    postSalidas,
} from "@/app/redux/slices/salidaProductosSlice";
import { AppDispatch } from "@/app/redux/store";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SalidaProductosModal = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [productoFinalId, setproductoFinalId] = useState<number>(0);
    const [formula_id, setFormula_id] = useState<number>(0);
    const [numero_lote, setNumero_lote] = useState<string>("");
    const [fecha_salida, setFecha_salida] = useState<Date | null>(null);
    const [envasado_id, setEnvasado_id] = useState<number>(0);
    const [formato_id, setFormato_id] = useState<number>(0);
    const [destino_id, setDestino_id] = useState<number>(0);
    const [vehiculo_id, setVehiculo_id] = useState<number>(0);
    const [proyecto_id, setProyecto_id] = useState<number>(0);
    const [cantidad, setCantidad] = useState<number>(0);
    const [fecha_caducidad, setFecha_caducidad] = useState<Date | null>(null);
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = () => {
        const addSalida: postSalidaProductosInterface = {
            producto_final_id: productoFinalId,
            formula_id: formula_id,
            numero_lote: numero_lote,
            fecha_salida: fecha_salida ? fecha_salida.getTime() / 1000 : 0,
            cantidad: cantidad,
            fecha_caducidad: fecha_caducidad
                ? fecha_caducidad.getTime() / 1000
                : 0,
            envasado_id: envasado_id,
            formato_id: formato_id,
            destino_id: destino_id,
            vehiculo_id: vehiculo_id,
            id_proyecto: proyecto_id,
        };

        try {
            dispatch(postSalidas(addSalida));
            dispatch(fetchSalidas());
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
                                keyfilter={"int"}
                                id="producto_final_id"
                                value={productoFinalId.toString()}
                                onChange={(e) =>
                                    setproductoFinalId(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID del Producto Final
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="formula_id"
                                keyfilter={"int"}
                                value={formula_id.toString()}
                                onChange={(e) =>
                                    setFormula_id(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID de formula
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="numero_lote"
                                value={numero_lote}
                                onChange={(e) => setNumero_lote(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                Numero de lote
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                keyfilter={"int"}
                                id="cantidad"
                                value={cantidad.toString()}
                                onChange={(e) =>
                                    setCantidad(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">Cantidad</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Calendar
                            value={fecha_salida}
                            onChange={(e: any) => setFecha_salida(e.value)}
                            placeholder="Fecha de salida"
                            dateFormat="dd/mm/yy"
                            showButtonBar
                            className="p-calendar p-component"
                        />
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Calendar
                            value={fecha_caducidad}
                            onChange={(e: any) => setFecha_caducidad(e.value)}
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
                                value={envasado_id.toString()}
                                onChange={(e) =>
                                    setEnvasado_id(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID de envasado
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="formato_id"
                                value={formato_id.toString()}
                                onChange={(e) =>
                                    setFormato_id(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID de formato
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="vehiculo_id"
                                value={vehiculo_id.toString()}
                                onChange={(e) =>
                                    setVehiculo_id(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID de vehiculo
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="destino_id"
                                value={destino_id.toString()}
                                onChange={(e) =>
                                    setDestino_id(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID de destino
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="proyecto_id"
                                value={proyecto_id.toString()}
                                onChange={(e) =>
                                    setProyecto_id(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID de proyecto
                            </label>
                        </FloatLabel>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default SalidaProductosModal;
