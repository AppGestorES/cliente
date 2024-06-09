import {
    getProductosFinalesInterface,
    productosFinalesInterface,
    putProductosFinalesInterface,
} from "@/app/interfaces/ProductosFinales";
import {
    fetchProductosFinales,
    putProductosFinales,
} from "@/app/redux/slices/prodcutosFinalesSlice";
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
    producto: getProductosFinalesInterface;
    onHide: () => void;
}

const EditProductosFinalesModal: React.FC<Props> = ({ producto, onHide }) => {
    const [visible, setVisible] = useState<boolean>(true);
    const [nombre, setNombre] = useState<string>(producto.nombre);
    const [formulaId, setFormulaId] = useState<number>(producto.formula_id);
    const [caducidad, setCaducidad] = useState<Date | null>(
        new Date(producto.caducidad)
    );
    const [idProyecto, setIdProyecto] = useState<number>(producto.proyecto.id);
    const dispatch: AppDispatch = useDispatch();
    const toast = useRef<Toast>(null);

    const handleSubmit = () => {
        const putProductos: putProductosFinalesInterface = {
            id: producto.id,
            nombre: nombre,
            formula_id: formulaId,
            caducidad: caducidad ? caducidad.getTime() / 1000 : 0,
            id_proyecto: idProyecto,
        };

        try {
            dispatch(putProductosFinales(putProductos));
            dispatch(fetchProductosFinales());
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
                header="Añadir"
                footer={footerContent}
                visible={visible}
                className="bg-[var(--surface-c)]"
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => setVisible(false)}
            >
                <form className="w-full grid grid-cols-3 gap-6 p-5 modalForm">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="cantidad_kg"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="cantidad_kg">Nombre</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                keyfilter={"int"}
                                id="formula_id"
                                value={formulaId.toString()}
                                onChange={(e) =>
                                    setFormulaId(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID Formula
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Calendar
                            value={caducidad}
                            onChange={(e: any) => setCaducidad(e.value)}
                            placeholder="Fecha de caducidad"
                            dateFormat="dd/mm/yy"
                            showButtonBar
                            className="p-calendar p-component"
                        />
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                keyfilter={"int"}
                                id="idProyecto"
                                value={idProyecto.toString()}
                                onChange={(e) =>
                                    setIdProyecto(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="producto_final_id">
                                ID Proyecto
                            </label>
                        </FloatLabel>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default EditProductosFinalesModal;
