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
import {
    getMateriasPrimasInterface,
    postMateriasPrimasInterface,
    putMateriasPrimasInterface,
} from "@/app/interfaces/MateriasPrimas";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import CreateMateriaPrimaModal from "@/app/Components/analisis-control/analisisControlModal";
import EditMateriaPrimaModal from "@/app/Components/analisis-control/editAnalisisControlModal";

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
    const [createModalVisible, setCreateModalVisible] = useState(false);
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

    const handleSuccess = () => {
        dispatch(fetchMateriasPrimas());
        toast.current?.show({
            severity: "success",
            summary: "Éxito",
            detail: "La operación se realizó con éxito",
            life: 3000,
        });
    };

    const handleCreateSubmit = (product: postMateriasPrimasInterface) => {
        dispatch(postMateriasPrimas(product)).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
                toast.current?.show({
                    severity: "success",
                    summary: "Creación Exitosa",
                    detail: "La materia prima fue agregada",
                    life: 3000,
                });
                setCreateModalVisible(false);
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Error al Crear",
                    detail: "Hubo un error al agregar la materia prima",
                    life: 3000,
                });
            }
        });
    };

    const handleEditSubmit = (product: putMateriasPrimasInterface) => {
        dispatch(putMateriasPrimas(product)).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
                toast.current?.show({
                    severity: "success",
                    summary: "Actualización Exitosa",
                    detail: "La materia prima fue actualizada",
                    life: 3000,
                });
                setModalVisible(false);
                setSelectedProduct(null);
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Error al Actualizar",
                    detail: "Hubo un error al actualizar la materia prima",
                    life: 3000,
                });
            }
        });
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
                    <CreateMateriaPrimaModal />
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
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
            />
        </div>
    );
};

export default ControlMateriaPrima;
