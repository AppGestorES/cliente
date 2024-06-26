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
import withAuth from "../withAuth";

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
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Eliminado con exito",
                life: 3000,
            });
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
            <Toast ref={toast} position="bottom-right" />
            <ConfirmDialog />
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between px-4">
                <h2 className="text-xl">Entrada de Productos</h2>
                <div className="flex gap-2 items-center">
                    {selectedProducts.length > 0 && (
                        <Button
                            label="Eliminar seleccionados"
                            icon="pi pi-trash"
                            severity="danger"
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
                    {
                        field: "fecha_entrada",
                        header: "Fecha Entrada",
                        render: (rowData) =>
                            rowData.fecha_entrada ? (
                                <span>
                                    {new Date(
                                        rowData.fecha_entrada * 1000
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
                        header: "Envasado",
                        render: (rowData) =>
                            rowData.envasado && rowData.envasado.nombre ? (
                                <span>{rowData.envasado.nombre}</span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    {
                        field: "operario_id",
                        header: "Operario",
                        render: (rowData) =>
                            rowData.operario && rowData.operario.nombre ? (
                                <span>{rowData.operario.nombre}</span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    {
                        field: "id_proyecto",
                        header: "Proyecto",
                        render: (rowData) =>
                            rowData.proyecto && rowData.proyecto.nombre ? (
                                <span>{rowData.proyecto.nombre}</span>
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

export default withAuth(EntradaProductosPage);
