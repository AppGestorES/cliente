import {
    putSalidaProductosInterface,
    salidaProductosInterface,
} from "@/app/interfaces/SalidaProductos";
import {
    fetchSalidas,
    putSalidas,
} from "@/app/redux/slices/salidaProductosSlice";
import { AppDispatch } from "@/app/redux/store";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
    salida: salidaProductosInterface;
    onHide: () => void;
}

const EditSalidaProductos: React.FC<Props> = ({ salida, onHide }) => {
    const [visible, setVisible] = useState<boolean>(true);
    const [productoFinalId, setproductoFinalId] = useState<number>(
        salida.producto_final_id
    );
    const [formula_id, setFormula_id] = useState<number>(salida.formula_id);
    const [numero_lote, setNumero_lote] = useState<string>(salida.numero_lote);
    const [fecha_salida, setFecha_salida] = useState<Date | null>(
        new Date(salida.fecha_salida * 1000)
    );
    const [envasado_id, setEnvasado_id] = useState<number>(
        salida.envasado_id.id
    );
    const [formato_id, setFormato_id] = useState<number>(salida.formato_id.id);
    const [destino_id, setDestino_id] = useState<number>(salida.destino_id.id);
    const [vehiculo_id, setVehiculo_id] = useState<number>(
        salida.vehiculo_id.id
    );
    const [proyecto_id, setProyecto_id] = useState<number>(salida.proyecto.id);
    const [cantidad, setCantidad] = useState<number>(salida.cantidad);
    const [fecha_caducidad, setFecha_caducidad] = useState<Date | null>(
        new Date(salida.fecha_caducidad * 1000)
    );
    const dispatch: AppDispatch = useDispatch();
    const toast = useRef<Toast>(null);

    const handleSubmit = () => {
        const putSalida: putSalidaProductosInterface = {
            id: salida.id,
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
            dispatch(putSalidas(putSalida));
            dispatch(fetchSalidas());
            toast.current?.show({
                severity: "success",
                summary: "Actualización Exitosa",
                detail: "El producto fue actualizado",
                life: 3000,
            });
            setVisible(false);
        } catch (error) {
            console.error("Error");
        }
    };

    const footerContent = (
        <div className="flex justify-center">
            <Button
                type="submit"
                label="Guardar"
                icon="pi pi-check"
                onClick={handleSubmit}
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
                severity="danger"
            />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} position="bottom-right" />
            <Dialog
                header="Editar Producto"
                footer={footerContent}
                visible={visible}
                className="bg-[var(--surface-c)]"
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => {
                    setVisible(false);
                    onHide();
                }}
            >
                <form className="w-full grid grid-cols-3 gap-6 p-5 modalForm">
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

export default EditSalidaProductos;
