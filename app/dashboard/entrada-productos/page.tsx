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
import { EntradaDeProductos } from "@/app/interfaces/EntradaProductos";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

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
        setSelectedProduct(product);
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

    const handleModalSubmit = (product: EntradaDeProductos) => {
        if (selectedProduct) {
            dispatch(
                putEntradaProductos({
                    id: selectedProduct.id,
                    updatedProduct: product,
                })
            );
        } else {
            dispatch(postEntradaProductos(product));
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
                        onClick={() => setModalVisible(true)}
                    />
                </div>
            </div>
            <GenericTable
                data={productos}
                columns={[
                    { field: "id", header: "ID" },
                    { field: "producto_final_id", header: "Producto Final Id" },
                    {
                        field: "fecha_entrada",
                        header: "Fecha Entrada",
                        render: (rowData) =>
                            new Date(
                                rowData.fecha_entrada * 1000
                            ).toLocaleDateString(),
                    },
                    { field: "proveedor", header: "Proveedor" },
                    { field: "numero_albaran", header: "Número Albaran" },
                    { field: "numero_lote", header: "Número de lote" },
                    { field: "cantidad_kg", header: "Cantidad (KG)" },
                    {
                        field: "fecha_caducidad",
                        header: "Fecha Caducidad",
                        render: (rowData) =>
                            rowData.fecha_caducidad
                                ? new Date(
                                      rowData.fecha_caducidad * 1000
                                  ).toLocaleDateString()
                                : "",
                    },
                    { field: "envasado_id", header: "ID Envasado" },
                    { field: "operario_id", header: "ID Operario" },
                    { field: "id_proyecto", header: "ID Proyecto" },
                ]}
                selectedItems={selectedProducts}
                setSelectedItems={setSelectedProducts}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
            />
            <GenericModal
                visible={modalVisible}
                setVisible={setModalVisible}
                initialValues={
                    selectedProduct || {
                        id: 0,
                        producto_final_id: 0,
                        fecha_entrada: Math.floor(Date.now() / 1000),
                        proveedor: "",
                        numero_albaran: "",
                        numero_lote: "",
                        cantidad_kg: 0,
                        fecha_caducidad: 0,
                        envasado_id: 0,
                        operario_id: 0,
                        id_proyecto: 1,
                    }
                }
                onSubmit={handleModalSubmit}
                fields={[
                    {
                        key: "producto_final_id",
                        label: "ID del Producto Final",
                        type: "number",
                    },
                    {
                        key: "fecha_entrada",
                        label: "Fecha de entrada",
                        type: "date",
                    },
                    { key: "proveedor", label: "Proveedor", type: "text" },
                    {
                        key: "numero_albaran",
                        label: "Número de albarán",
                        type: "text",
                    },
                    {
                        key: "numero_lote",
                        label: "Número de lote",
                        type: "text",
                    },
                    {
                        key: "cantidad_kg",
                        label: "Cantidad (KG)",
                        type: "number",
                    },
                    {
                        key: "fecha_caducidad",
                        label: "Fecha de caducidad",
                        type: "date",
                    },
                    {
                        key: "envasado_id",
                        label: "ID Envasado",
                        type: "number",
                    },
                    {
                        key: "operario_id",
                        label: "ID Operario",
                        type: "number",
                    },
                ]}
            />
        </div>
    );
};

export default EntradaProductosPage;
