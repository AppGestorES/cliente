"use client";

import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
/* import {
    deleteControlMateriaPrima,
    fetchControlMateriaPrima,
} from "@/app/redux/slice/apiSlice";*/
import { EntradaDeProductos } from "@/app/interfaces/EntradaProductos";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ModalControlMateriaPrima from "@/app/Components/analisis-control/modalControlMateriaPrima";
import TablaControlMateriaPrima from "@/app/Components/analisis-control/tablaControlMateriaPrima";
import {
    deleteMateriasPrimas,
    fetchMateriasPrimas,
} from "@/app/redux/slices/controlMateriaPrimaSlice";

const invalid_type_error =
    "Tipo de dato inválido proporcionado para este campo";
const required_error = "Este campo no puede estar vacío";

export const FormSchema = z.object({
    producto: z
        .string({ invalid_type_error, required_error })
        .min(1, { message: required_error }),
});

const ControlMateriaPrima: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [botonEliminar, setBotonEliminar] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<
        EntradaDeProductos[]
    >([]);
    const dispatch: AppDispatch = useDispatch();
    const productos = useSelector(
        (state: RootState) => state.controlMateriaPrima.materiasPrimas
    );
    const status = useSelector(
        (state: RootState) => state.controlMateriaPrima.status
    );

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMateriasPrimas());
        }
    }, [status, dispatch]);

    const handleDelete = () => {
        if (selectedProducts.length > 0) {
            const idsToDelete = selectedProducts.map((product) => product.id);
            dispatch(deleteMateriasPrimas(idsToDelete[0]));
            setSelectedProducts([]);
            setBotonEliminar(false);
        }
    };

    const confirmDelete = () => {
        confirmDialog({
            message:
                "¿Está seguro de que desea eliminar los productos seleccionados?",
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
                <h2 className="text-xl">
                    Análisis de control de materia prima
                </h2>
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
                        label="Añadir producto"
                        icon="pi pi-plus"
                        className="bg-[var(--surface-a)] p-2 hover:bg-[var(--primary-color)] mt-2 max-w-[200px]"
                        onClick={() => setVisible(true)}
                    />
                </div>
            </div>
            <ModalControlMateriaPrima
                visible={visible}
                setVisible={setVisible}
            />
            <TablaControlMateriaPrima
                setSelectedProducts={setSelectedProducts}
                setBotonEliminar={setBotonEliminar}
            />
        </div>
    );
};

export default ControlMateriaPrima;
