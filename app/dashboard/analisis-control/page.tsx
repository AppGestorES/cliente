"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    postMateriasPrimas,
    putMateriasPrimas,
    deleteMateriasPrimas,
    fetchMateriasPrimas,
} from "@/app/redux/slices/controlMateriaPrimaSlice";
import GenericTable from "@/app/Components/generics/GenericTable";
import GenericModal from "@/app/Components/generics/GenericModal";
import { getMateriasPrimasInterface } from "@/app/interfaces/MateriasPrimas";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const ControlMateriaPrima: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const productos = useSelector(
        (state: RootState) => state.controlMateriaPrima.materiasPrimas
    );
    const status = useSelector(
        (state: RootState) => state.controlMateriaPrima.status
    );
    const error = useSelector(
        (state: RootState) => state.controlMateriaPrima.error
    );

    const [selectedProducts, setSelectedProducts] = useState<
        getMateriasPrimasInterface[]
    >([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] =
        useState<getMateriasPrimasInterface | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMateriasPrimas());
        }
    }, [status, dispatch]);

    const handleEdit = (product: getMateriasPrimasInterface) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const handleDelete = () => {
        if (selectedProducts.length > 0) {
            const idsToDelete = selectedProducts.map((product) => product.id);
            dispatch(deleteMateriasPrimas(idsToDelete)).then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    toast.current?.show({
                        severity: "success",
                        summary: "Eliminación Exitosa",
                        detail: "Las materias primas fueron eliminadas",
                        life: 3000,
                    });
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error al Eliminar",
                        detail: "Hubo un error al eliminar las materias primas",
                        life: 3000,
                    });
                }
                setSelectedProducts([]);
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

    const handleModalSubmit = (product: getMateriasPrimasInterface) => {
        if (selectedProduct) {
            dispatch(
                putMateriasPrimas({
                    id: selectedProduct.id,
                    updatedProduct: product,
                })
            ).then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    toast.current?.show({
                        severity: "success",
                        summary: "Actualización Exitosa",
                        detail: "La materia prima fue actualizada",
                        life: 3000,
                    });
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error al Actualizar",
                        detail: "Hubo un error al actualizar la materia prima",
                        life: 3000,
                    });
                }
                setSelectedProduct(null);
                setModalVisible(false);
            });
        } else {
            dispatch(postMateriasPrimas(product)).then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    toast.current?.show({
                        severity: "success",
                        summary: "Creación Exitosa",
                        detail: "La materia prima fue agregada",
                        life: 3000,
                    });
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error al Crear",
                        detail: "Hubo un error al agregar la materia prima",
                        life: 3000,
                    });
                }
                setModalVisible(false);
            });
        }
    };

    return (
        <div className="w-full">
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between px-4">
                <h2 className="text-xl">
                    Análisis de control de materia prima
                </h2>
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
                    { field: "nombre", header: "Nombre" },
                    { field: "caducidad", header: "Caducidad (días)" },
                    { field: "stock_kgs", header: "Stock (kg)" },
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
                        nombre: "",
                        caducidad: 0,
                        stock_kgs: 0,
                        id_proyecto: 0,
                    }
                }
                onSubmit={handleModalSubmit}
                fields={[
                    { key: "nombre", label: "Nombre", type: "text" },
                    { key: "caducidad", label: "Caducidad", type: "date" },
                    { key: "stock_kgs", label: "Stock (kg)", type: "number" },
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

export default ControlMateriaPrima;
