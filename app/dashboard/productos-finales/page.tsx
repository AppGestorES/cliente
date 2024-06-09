"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProductosFinales,
    postProductosFinales,
    putProductosFinales,
    deleteProductosFinales,
} from "@/app/redux/slices/prodcutosFinalesSlice";
import GenericTable from "@/app/Components/generics/GenericTable";
import {
    getProductosFinalesInterface,
    postProductosFinalesInterface,
    putProductosFinalesInterface,
} from "@/app/interfaces/ProductosFinales";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import ProductosFinalesModal from "@/app/Components/productos-finales/productosFinalesModal";
import React from "react";
import EditEntradaProductosModal from "@/app/Components/entrada-productos/editEntradaProductosModal";
import EditProductosFinalesModal from "@/app/Components/productos-finales/editProductosFinalesModal";
import withAuth from "../withAuth";

const ProductosFinalesPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const productosFinales = useSelector(
        (state: RootState) => state.productosFinales.productosFinales
    );
    const status = useSelector(
        (state: RootState) => state.productosFinales.status
    );
    const error = useSelector(
        (state: RootState) => state.productosFinales.error
    );

    const [selectedProductos, setSelectedProductos] = useState<
        getProductosFinalesInterface[]
    >([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProducto, setSelectedProducto] =
        useState<getProductosFinalesInterface | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProductosFinales());
        }
    }, [status, dispatch]);

    const handleDelete = () => {
        if (selectedProductos.length > 0) {
            const idsToDelete = selectedProductos.map(
                (producto) => producto.id
            );
            dispatch(deleteProductosFinales(idsToDelete)).then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    toast.current?.show({
                        severity: "success",
                        summary: "Eliminación Exitosa",
                        detail: "Los productos finales fueron eliminados",
                        life: 3000,
                    });
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error al Eliminar",
                        detail: "Hubo un error al eliminar los productos finales",
                        life: 3000,
                    });
                }
                setSelectedProductos([]);
            });
        }
    };

    const confirmDelete = () => {
        confirmDialog({
            message:
                "¿Está seguro de que desea eliminar los productos finales seleccionados?",
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
                <h2 className="text-xl">Productos Finales</h2>
                <div className="flex gap-2 items-center">
                    {selectedProductos.length > 0 && (
                        <Button
                            label="Eliminar seleccionados"
                            icon="pi pi-trash"
                            severity="danger"
                            onClick={confirmDelete}
                        />
                    )}
                    <ProductosFinalesModal />
                </div>
            </div>
            <GenericTable
                data={productosFinales}
                columns={[
                    { field: "id", header: "ID" },
                    { field: "nombre", header: "Nombre" },
                    { field: "formula_id", header: "ID Fórmula" },
                    {
                        field: "caducidad",
                        header: "Fecha Caducidad",
                        render: (rowData) =>
                            rowData.caducidad ? (
                                <span>
                                    {new Date(
                                        rowData.caducidad * 1000
                                    ).toLocaleDateString()}
                                </span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    {
                        field: "proyecto",
                        header: "ID Proyecto",
                        render: (rowData) =>
                            rowData.proyecto && rowData.proyecto.id ? (
                                <span>{rowData.proyecto.id}</span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                ]}
                selectedItems={selectedProductos}
                setSelectedItems={setSelectedProductos}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
                editComponent={(item, onHide) => (
                    <EditProductosFinalesModal
                        producto={item}
                        onHide={onHide}
                    />
                )}
            />
        </div>
    );
};

export default withAuth(ProductosFinalesPage);
