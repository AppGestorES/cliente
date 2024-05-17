"use client";

import { Button } from "primereact/button";
import { useState } from "react";
import { z } from "zod";
import ModalEntradaProductos from "../Components/entrada-productos/modalEntradaProductos";
import TablaProductos from "../Components/entrada-productos/tablaProductos";

const invalid_type_error = "Invalid type provided for this field";
const required_error = "This field cannot be blank";

export const FormSchema = z.object({
    producto: z
        .string({ invalid_type_error, required_error })
        .min(1, { message: required_error }),
});

const EntradaProductos = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="w-full flex flex-col">
            <h2 className="text-xl">Entrada de Productos</h2>
            <Button
                label="Añadir producto"
                icon="pi pi-plus"
                className="bg-[var(--surface-a)] p-2 hover:bg-[var(--primary-color)] mt-2 max-w-[200px]"
                onClick={() => setVisible(true)}
            />
            <ModalEntradaProductos visible={visible} setVisible={setVisible} />
            <TablaProductos />
        </div>
    );
};

export default EntradaProductos;
