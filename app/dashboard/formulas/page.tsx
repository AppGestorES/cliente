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
import GenericModal from "@/app/Components/generics/GenericModal";
import {
    getFormulasInterface,
    postFormulasInterface,
} from "@/app/interfaces/Formulas";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

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

    const handleEdit = (formula: getFormulasInterface) => {
        setSelectedFormula(formula);
        setModalVisible(true);
    };

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

    const handleModalSubmit = (formula: postFormulasInterface) => {
        if (selectedFormula) {
            dispatch(
                putFormulas({
                    id: selectedFormula.id,
                    updatedFormula: formula,
                })
            );
        } else {
            dispatch(postFormulas(formula));
        }
        setSelectedFormula(null);
        setModalVisible(false);
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
                            className="bg-[var(--surface-a)] p-2 hover:bg-[var(--red-400)] mt-2 max-w-[300px]"
                            onClick={confirmDelete}
                        />
                    )}
                    <Button
                        label="Añadir fórmula"
                        icon="pi pi-plus"
                        className="bg-[var(--surface-a)] p-2 hover:bg-[var(--primary-color)] mt-2 max-w-[200px]"
                        onClick={() => setModalVisible(true)}
                    />
                </div>
            </div>
            <GenericTable
                data={formulas}
                columns={[
                    { field: "id", header: "ID" },
                    { field: "nombre", header: "Nombre" },
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
                selectedItems={selectedFormulas}
                setSelectedItems={setSelectedFormulas}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
            />
            <GenericModal
                visible={modalVisible}
                setVisible={setModalVisible}
                initialValues={
                    selectedFormula || {
                        id: 0,
                        nombre: "",
                        caducidad: 0,
                        id_proyecto: 0,
                    }
                }
                onSubmit={handleModalSubmit}
                onSuccess={() => dispatch(fetchFormulas())}
                fields={[
                    {
                        key: "nombre",
                        label: "Nombre",
                        type: "text",
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

export default FormulasPage;
