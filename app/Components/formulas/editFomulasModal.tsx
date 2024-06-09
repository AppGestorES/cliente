import {
    formulasInterface,
    putFormulasInterface,
} from "@/app/interfaces/Formulas";
import { fetchFormulas, putFormulas } from "@/app/redux/slices/formulasSlice";
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
    formula: formulasInterface;
    onHide: () => void;
}

const EditFormulasModal: React.FC<Props> = ({ formula, onHide }) => {
    const [visible, setVisible] = useState<boolean>(true);
    const [nombre, setNombre] = useState<string>(formula.nombre);
    const [caducidad, setCaducidad] = useState<Date | null>(
        new Date(formula.caducidad * 1000)
    );
    const [id_proyecto, setId_proyecto] = useState<number>(
        formula.proyecto!.id ?? 0
    );
    const dispatch: AppDispatch = useDispatch();
    const toast = useRef<Toast>(null);

    const handleSubmit = () => {
        const updatedFormula: putFormulasInterface = {
            id: formula.id,
            nombre: nombre,
            caducidad: caducidad!.getTime() / 1000,
            id_proyecto: id_proyecto,
        };

        dispatch(putFormulas(updatedFormula)).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
                toast.current?.show({
                    severity: "success",
                    summary: "Actualización Exitosa",
                    detail: "La formula fue actualizada",
                    life: 3000,
                });
                dispatch(fetchFormulas());
                setVisible(false);
                onHide();
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Error al Actualizar",
                    detail: "Hubo un error al actualizar la formula",
                    life: 3000,
                });
            }
        });
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
        <div>
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
                                id="formulaName"
                                value={nombre}
                                onChange={(e: any) => setNombre(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="formulaName">Nombre</label>
                        </FloatLabel>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Calendar
                            value={caducidad}
                            onChange={(e: any) => setCaducidad(e.value)}
                            placeholder="Fecha de entrada"
                            dateFormat="dd/mm/yy"
                            showButtonBar
                            className="p-calendar p-component"
                        />
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FloatLabel>
                            <InputText
                                id="id_proyecto"
                                value={id_proyecto.toString()}
                                onChange={(e: any) =>
                                    setId_proyecto(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="proveedor">ID Proyecto</label>
                        </FloatLabel>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default EditFormulasModal;
