"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMateriasPrimas,
    postMateriasPrimas,
    putMateriasPrimas,
    deleteMateriasPrimas,
} from "@/app/redux/slices/controlMateriaPrimaSlice";
import GenericTable from "@/app/Components/generics/GenericTable";
import GenericModal from "@/app/Components/generics/GenericModal";
import {
    getMateriasPrimasInterface,
    postMateriasPrimasInterface,
} from "@/app/interfaces/MateriasPrimas";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const MateriasPrimasPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const materiasPrimas = useSelector(
        (state: RootState) => state.controlMateriaPrima.materiasPrimas
    );
    const status = useSelector(
        (state: RootState) => state.controlMateriaPrima.status
    );
    const error = useSelector(
        (state: RootState) => state.controlMateriaPrima.error
    );

    const [selectedMateriasPrimas, setSelectedMateriasPrimas] = useState<
        getMateriasPrimasInterface[]
    >([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMateriaPrima, setSelectedMateriaPrima] =
        useState<getMateriasPrimasInterface | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMateriasPrimas());
        }
    }, [status, dispatch]);

    const handleEdit = (materiaPrima: getMateriasPrimasInterface) => {
        setSelectedMateriaPrima(materiaPrima);
        setModalVisible(true);
    };

    const handleDelete = () => {
        if (selectedMateriasPrimas.length > 0) {
            const idsToDelete = selectedMateriasPrimas.map(
                (materiaPrima) => materiaPrima.id
            );
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
                setSelectedMateriasPrimas([]);
            });
        }
    };

    const confirmDelete = () => {
        confirmDialog({
            message:
                "¿Está seguro de que desea eliminar las materias primas seleccionadas?",
            header: "Confirmación",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sí",
            rejectLabel: "No",
            accept: handleDelete,
            reject: () => {},
        });
    };

    const handleModalSubmit = (materiaPrima: postMateriasPrimasInterface) => {
        if (selectedMateriaPrima) {
            dispatch(
                putMateriasPrimas({
                    id: selectedMateriaPrima.id,
                    updatedMateriaPrima: materiaPrima,
                })
            );
        } else {
            dispatch(postMateriasPrimas(materiaPrima));
        }
        setSelectedMateriaPrima(null);
        setModalVisible(false);
    };

    return (
        <div className="w-full">
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between px-4">
                <h2 className="text-xl">Materias Primas</h2>
                <div className="flex gap-2 items-center">
                    {selectedMateriasPrimas.length > 0 && (
                        <Button
                            label="Eliminar seleccionados"
                            icon="pi pi-trash"
                            className="bg-[var(--surface-a)] p-2 hover:bg-[var(--red-400)] mt-2 max-w-[300px]"
                            onClick={confirmDelete}
                        />
                    )}
                    <Button
                        label="Añadir materia prima"
                        icon="pi pi-plus"
                        className="bg-[var(--surface-a)] p-2 hover:bg-[var(--primary-color)] mt-2 max-w-[200px]"
                        onClick={() => setModalVisible(true)}
                    />
                </div>
            </div>
            <GenericTable
                data={materiasPrimas}
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
                    { field: "stock_kgs", header: "Stock (kg)" },
                    { field: "id_proyecto", header: "ID Proyecto" },
                ]}
                selectedItems={selectedMateriasPrimas}
                setSelectedItems={setSelectedMateriasPrimas}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
            />
            <GenericModal
                visible={modalVisible}
                setVisible={setModalVisible}
                initialValues={
                    selectedMateriaPrima || {
                        id: 0,
                        nombre: "",
                        caducidad: 0,
                        stock_kgs: 0,
                        id_proyecto: 0,
                    }
                }
                onSuccess={() => dispatch(fetchMateriasPrimas())}
                onSubmit={handleModalSubmit}
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
                        key: "stock_kgs",
                        label: "Stock (kg)",
                        type: "number",
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

export default MateriasPrimasPage;
