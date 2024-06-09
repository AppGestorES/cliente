"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFormulas,
    postFormulas,
    putFormulas,
    deleteFormulas,
} from "@/app/redux/slices/formulasSlice";
import GenericTable from "@/app/Components/generics/GenericTable";
import {
    getFormulasInterface,
    postFormulasInterface,
} from "@/app/interfaces/Formulas";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import EditFormulasModal from "@/app/Components/formulas/editFomulasModal";
import React from "react";
import EntradaFormulas from "@/app/Components/formulas/formulasModal";
import withAuth from "../withAuth";

const FormulasPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const formulas = useSelector((state: RootState) => state.formulas.formulas);
    const status = useSelector((state: RootState) => state.formulas.status);
    const error = useSelector((state: RootState) => state.formulas.error);

    const [selectedFormulas, setSelectedFormulas] = useState<
        getFormulasInterface[]
    >([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFormula, setSelectedFormula] =
        useState<getFormulasInterface | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchFormulas());
        }
    }, [status, dispatch]);

    const handleDelete = () => {
        if (selectedFormulas.length > 0) {
            const idsToDelete = selectedFormulas.map((formula) => formula.id);
            dispatch(deleteFormulas(idsToDelete)).then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    toast.current?.show({
                        severity: "success",
                        summary: "Eliminación Exitosa",
                        detail: "Las fórmulas fueron eliminadas",
                        life: 3000,
                    });
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error al Eliminar",
                        detail: "Hubo un error al eliminar las fórmulas",
                        life: 3000,
                    });
                }
                setSelectedFormulas([]);
            });
        }
    };

    const confirmDelete = () => {
        confirmDialog({
            message:
                "¿Está seguro de que desea eliminar las fórmulas seleccionadas?",
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
                <h2 className="text-xl">Fórmulas</h2>
                <div className="flex gap-2 items-center">
                    {selectedFormulas.length > 0 && (
                        <Button
                            label="Eliminar seleccionados"
                            icon="pi pi-trash"
                            severity="danger"
                            onClick={confirmDelete}
                        />
                    )}
                    <EntradaFormulas />
                </div>
            </div>
            <GenericTable
                data={formulas}
                columns={[
                    { field: "id", header: "ID" },
                    { field: "nombre", header: "Nombre" },
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
                        header: "Proyecto",
                        render: (rowData) =>
                            rowData.proyecto && rowData.proyecto.nombre ? (
                                <span>{rowData.proyecto.nombre}</span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                ]}
                selectedItems={selectedFormulas}
                setSelectedItems={setSelectedFormulas}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
                editComponent={(item, onHide) => {
                    return <EditFormulasModal formula={item} onHide={onHide} />;
                }}
            />
        </div>
    );
};

export default withAuth(FormulasPage);
