"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchEntradaProductos,
    postEntradaProductos,
    putEntradaProductos,
    deleteEntradaProductos,
} from "@/app/redux/slices/entradaProductosSlice";
import GenericTable from "@/app/Components/generics/GenericTable";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import React from "react";
import EntradaProductosModal from "@/app/Components/entrada-productos/entradaProductosModal";
import EditEntradaProductosModal from "@/app/Components/entrada-productos/editEntradaProductosModal";
import { EntradaDeProductos } from "@/app/interfaces/EntradaProductos";
import { AppDispatch, RootState } from "@/app/redux/store";
import { Toast } from "primereact/toast";

const EntradaProductosPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const productos = useSelector(
        (state: RootState) => state.entradaProductos.productos
    );
    const status = useSelector(
        (state: RootState) => state.entradaProductos.status
    );
    const error = useSelector(
        (state: RootState) => state.entradaProductos.error
    );

    const [selectedProducts, setSelectedProducts] = useState<
        EntradaDeProductos[]
    >([]);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchEntradaProductos());
        }
    }, [status, dispatch]);

    const handleDelete = () => {
        if (selectedProducts.length > 0) {
            const idsToDelete = selectedProducts.map((product) => product.id);
            dispatch(deleteEntradaProductos(idsToDelete));
            setSelectedProducts([]);
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
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between px-4">
                <h2 className="text-xl">Entrada de Productos</h2>
                <div className="flex gap-2 items-center">
                    {selectedProducts.length > 0 && (
                        <Button
                            label="Eliminar seleccionados"
                            icon="pi pi-trash"
                            className="bg-[var(--surface-a)] p-2 hover:bg-[var(--red-400)] mt-2 max-w-[300px]"
                            onClick={confirmDelete}
                        />
                    )}
                    <EntradaProductosModal />
                </div>
            </div>
            <GenericTable
                data={productos}
                columns={[
                    { field: "id", header: "ID" },
                    { field: "producto_final_id", header: "Producto Final Id" },
                    {
                        field: "fecha_caducidad",
                        header: "Fecha Caducidad",
                        render: (rowData) =>
                            rowData.fecha_caducidad ? (
                                <span>
                                    {new Date(
                                        rowData.fecha_caducidad * 1000
                                    ).toLocaleDateString()}
                                </span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    { field: "proveedor", header: "Proveedor" },
                    { field: "numero_albaran", header: "Número Albaran" },
                    { field: "numero_lote", header: "Número de lote" },
                    { field: "cantidad_kg", header: "Cantidad (KG)" },
                    {
                        field: "envasado_id",
                        header: "ID Envasado",
                        render: (rowData) =>
                            rowData.envasado && rowData.envasado.id ? (
                                <span>{rowData.envasado.id}</span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    {
                        field: "operario_id",
                        header: "ID Operario",
                        render: (rowData) =>
                            rowData.operario && rowData.operario.id ? (
                                <span>{rowData.operario.id}</span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    {
                        field: "id_proyecto",
                        header: "ID Proyecto",
                        render: (rowData) =>
                            rowData.proyecto && rowData.proyecto.id ? (
                                <span>{rowData.proyecto.id}</span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                ]}
                selectedItems={selectedProducts}
                setSelectedItems={setSelectedProducts}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
                editComponent={(item, onHide) => (
                    <EditEntradaProductosModal
                        producto={item}
                        onHide={onHide}
                    />
                )}
            />
        </div>
    );
};

export default EntradaProductosPage;
