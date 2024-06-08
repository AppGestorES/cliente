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
import CreateMateriaPrimaModal from "@/app/Components/analisis-control/materiaPrimaModal";
import EditMateriaPrimaModal from "@/app/Components/analisis-control/editMateriaPrimaModal";
import React from "react";

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
                            severity="danger"
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
                    {
                        field: "proyecto",
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
                    <EditMateriaPrimaModal
                        materiaPrima={item}
                        onHide={onHide}
                    />
                )}
            />
        </div>
    );
};

export default ControlMateriaPrima;
