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
import GenericModal from "@/app/Components/generics/GenericModal";
import {
    getProductosFinalesInterface,
    postProductosFinalesInterface,
} from "@/app/interfaces/ProductosFinales";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

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

    const handleEdit = (producto: getProductosFinalesInterface) => {
        setSelectedProducto(producto);
        setModalVisible(true);
    };

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

    const handleModalSubmit = (producto: postProductosFinalesInterface) => {
        if (selectedProducto) {
            dispatch(
                putProductosFinales({
                    id: selectedProducto.id,
                    updatedProductoFinal: producto,
                })
            ).then(() => {
                dispatch(fetchProductosFinales());
            });
        } else {
            dispatch(postProductosFinales(producto)).then(() => {
                dispatch(fetchProductosFinales());
            });
        }
        setSelectedProducto(null);
        setModalVisible(false);
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
                            className="bg-[var(--surface-a)] p-2 hover:bg-[var(--red-400)] mt-2 max-w-[300px]"
                            onClick={confirmDelete}
                        />
                    )}
                    <Button
                        label="Añadir producto final"
                        icon="pi pi-plus"
                        className="bg-[var(--surface-a)] p-2 hover:bg-[var(--primary-color)] mt-2 max-w-[200px]"
                        onClick={() => setModalVisible(true)}
                    />
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
                        header: "Caducidad",
                        render: (rowData) =>
                            new Date(
                                rowData.caducidad * 1000
                            ).toLocaleDateString(),
                    },
                    { field: "id_proyecto", header: "ID Proyecto" },
                ]}
                selectedItems={selectedProductos}
                setSelectedItems={setSelectedProductos}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
            />
            <GenericModal
                visible={modalVisible}
                setVisible={setModalVisible}
                initialValues={
                    selectedProducto || {
                        id: 0,
                        nombre: "",
                        formula_id: 0,
                        caducidad: 0,
                        id_proyecto: 0,
                    }
                }
                onSubmit={handleModalSubmit}
                onSuccess={() => dispatch(fetchProductosFinales())}
                fields={[
                    {
                        key: "nombre",
                        label: "Nombre",
                        type: "text",
                    },
                    {
                        key: "formula_id",
                        label: "ID Fórmula",
                        type: "number",
                    },
                    {
                        key: "caducidad",
                        label: "Caducidad",
                        type: "date",
                    },
                    {
                        key: "id_proyecto",
                        label: "ID Proyecto",
                        type: "number",
                    },
                ]}
            />
        </div>
    );
};

export default ProductosFinalesPage;
