"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchEntradaProductos,
    postEntradaProductos,
    putEntradaProductos,
    deleteEntradaProductos,
} from "@/app/redux/slices/entradaProductosSlice";
import GenericTable from "@/app/Components/generics/GenericTable";
import GenericModal from "@/app/Components/generics/GenericModal";
import {
    EntradaDeProductos,
    postEntradasInterface,
    putEntradasInterface,
} from "@/app/interfaces/EntradaProductos";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import React from "react";
import EntradaProductosModal from "@/app/Components/entrada-productos/entradaProductosModal";

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
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] =
        useState<EntradaDeProductos | null>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchEntradaProductos());
        }
    }, [status, dispatch]);

    const handleEdit = (product: EntradaDeProductos) => {
        setSelectedProduct({
            ...product,
            envasado_id: product.envasado_id ?? 0,
            operario_id: product.operario_id ?? 0,
            id_proyecto: product.id_proyecto ?? 0,
        });
        setModalVisible(true);
    };

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

    const handleSubmit = () => {
        dispatch(fetchEntradaProductos());
    };

    const handleModalSubmit = (product: EntradaDeProductos) => {
        if (selectedProduct) {
            const updatedProduct: putEntradasInterface = {
                id: selectedProduct.id,
                producto_final_id: product.producto_final_id,
                fecha_entrada: product.fecha_entrada,
                proveedor: product.proveedor,
                numero_albaran: product.numero_albaran,
                numero_lote: product.numero_lote,
                cantidad_kg: product.cantidad_kg,
                fecha_caducidad: product.fecha_caducidad,
                envasado_id:
                    product.envasado!.id ?? selectedProduct.envasado_id,
                operario_id:
                    product.operario!.id ?? selectedProduct.operario_id,
                id_proyecto:
                    product.proyecto!.id ?? selectedProduct.id_proyecto,
            };
            console.log(updatedProduct);

            dispatch(
                putEntradaProductos({
                    id: selectedProduct.id,
                    updatedProduct: updatedProduct,
                })
            );
        } else {
            dispatch(postEntradaProductos(product as postEntradasInterface));
        }
        setSelectedProduct(null);
        setModalVisible(false);
    };

    return (
        <div className="w-full">
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
                    <Button
                        label="Añadir producto"
                        icon="pi pi-plus"
                        className="bg-[var(--surface-a)] p-2 hover:bg-[var(--primary-color)] mt-2 max-w-[200px]"
                        onClick={() => {
                            setSelectedProduct(null);
                            setModalVisible(true);
                        }}
                    />
                </div>
            </div>
            <GenericTable
                edit={true}
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
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
            />
            <EntradaProductosModal />
        </div>
    );
};

export default EntradaProductosPage;
