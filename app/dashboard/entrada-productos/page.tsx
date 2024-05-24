"use client";

import { Button } from "primereact/button";
import { useState } from "react";
import { z } from "zod";
import ModalEntradaProductos from "../../Components/entrada-productos/modalEntradaProductos";
import TablaProductos from "../../Components/entrada-productos/tablaProductos";
import { useDispatch } from "react-redux";
import { deleteEntradaProductos } from "@/app/redux/slice/apiSlice";
import { EntradaDeProductos } from "@/app/interfaces/EntradaProductos";
import { AppDispatch } from "@/app/redux/store";

const invalid_type_error = "Invalid type provided for this field";
const required_error = "This field cannot be blank";

export const FormSchema = z.object({
    producto: z
        .string({ invalid_type_error, required_error })
        .min(1, { message: required_error }),
});

const EntradaProductos: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [botonEliminar, setBotonEliminar] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<
        EntradaDeProductos[]
    >([]);
    const dispatch: AppDispatch = useDispatch();

    const handleDelete = () => {
        if (selectedProducts.length > 0) {
            const idsToDelete = selectedProducts.map((product) => product.id);
            dispatch(deleteEntradaProductos(idsToDelete));
            setSelectedProducts([]);
            setBotonEliminar(false);
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between px-4">
                <h2 className="text-xl">Entrada de Productos</h2>
                <div className="flex gap-2 items-center">
                    {botonEliminar && (
                        <Button
                            label="Eliminar seleccionados"
                            icon="pi pi-trash"
                            className="bg-[var(--surface-a)] p-2 hover:bg-[var(--red-400)] mt-2 max-w-[300px]"
                            onClick={handleDelete}
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
            <ModalEntradaProductos visible={visible} setVisible={setVisible} />
            <TablaProductos
                setSelectedProducts={setSelectedProducts}
                setBotonEliminar={setBotonEliminar}
            />
        </div>
    );
};

export default EntradaProductos;
