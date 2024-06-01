"use client";

import { Button } from "primereact/button";
import { useState } from "react";
import { z } from "zod";
import ModalSalidaProductos from "../../Components/salida-productos/modalSalidaProductos"; // Ensure this component exists
import TablaSalidaProductos from "../../Components/salida-productos/tablaSalidaProductos";
import { useDispatch } from "react-redux";
import { salidaProductosInterface } from "@/app/interfaces/SalidaProductos";
import { AppDispatch } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deleteSalidas } from "@/app/redux/slices/salidaProductosSlice";

const invalid_type_error =
    "Tipo de dato inválido proporcionado para este campo";
const required_error = "Este campo no puede estar vacío";

export const FormSchema = z.object({
    producto: z
        .string({ invalid_type_error, required_error })
        .min(1, { message: required_error }),
});

const SalidaProductos: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [botonEliminar, setBotonEliminar] = useState(false);
    const [selectedSalidas, setSelectedSalidas] = useState<
        salidaProductosInterface[]
    >([]);
    const dispatch: AppDispatch = useDispatch();

    const handleDelete = () => {
        if (selectedSalidas.length > 0) {
            const idsToDelete = selectedSalidas.map((salida) => salida.id);
            dispatch(deleteSalidas(idsToDelete));
            setSelectedSalidas([]);
            setBotonEliminar(false);
        }
    };

    const confirmDelete = () => {
        confirmDialog({
            message:
                "¿Está seguro de que desea eliminar las salidas seleccionadas?",
            header: "Confirmación",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sí",
            rejectLabel: "No",
            accept: handleDelete,
            reject: () => {},
        });
    };

    return (
        <div className="w-full">
            <ConfirmDialog />
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between px-4">
                <h2 className="text-xl">Salida de Productos</h2>
                <div className="flex gap-2 items-center">
                    {botonEliminar && (
                        <Button
                            label="Eliminar seleccionados"
                            icon="pi pi-trash"
                            className="bg-[var(--surface-a)] p-2 hover:bg-[var(--red-400)] mt-2 max-w-[300px]"
                            onClick={confirmDelete}
                        />
                    )}
                    <Button
                        label="Añadir salida"
                        icon="pi pi-plus"
                        className="bg-[var(--surface-a)] p-2 hover:bg-[var(--primary-color)] mt-2 max-w-[200px]"
                        onClick={() => setVisible(true)}
                    />
                </div>
            </div>
            <ModalSalidaProductos visible={visible} setVisible={setVisible} />
            <TablaSalidaProductos
                setSelectedSalidas={setSelectedSalidas}
                setBotonEliminar={setBotonEliminar}
            />
        </div>
    );
};

export default SalidaProductos;
