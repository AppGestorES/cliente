import {
    formulasInterface,
    postFormulasInterface,
} from "@/app/interfaces/Formulas";
import { fetchFormulas, postFormulas } from "@/app/redux/slices/formulasSlice";
import { AppDispatch } from "@/app/redux/store";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const EntradaFormulas = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [nombre, setNombre] = useState<string>("");
    const [caducidad, setCaducidad] = useState<Date | null>(null);
    const [id_proyecto, setIdProyecto] = useState<number>(0);
    const dispatch: AppDispatch = useDispatch();
    const toast = useRef<Toast>(null);

    const handleSubmit = () => {
        const addFormula: postFormulasInterface = {
            nombre: nombre,
            caducidad: caducidad ? caducidad?.getTime() / 1000 : 0,
            id_proyecto: id_proyecto,
        };

        try {
            dispatch(postFormulas(addFormula));
            dispatch(fetchFormulas());
            toast.current?.show({
                severity: "success",
                summary: "Agregado",
                detail: "Agregado con éxito",
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
            <Button
                label="Añadir formula"
                icon="pi pi-plus"
                onClick={() => setVisible(true)}
            />
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
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="nombre">Nombre formula</label>
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
                                id="id_proyecto"
                                value={id_proyecto.toString()}
                                onChange={(e) =>
                                    setIdProyecto(parseInt(e.target.value))
                                }
                                className="p-inputtext p-component p-2"
                            />
                            <label htmlFor="nombre">ID Proyecto</label>
                        </FloatLabel>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default EntradaFormulas;
