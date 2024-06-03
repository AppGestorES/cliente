"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSalidas,
    postSalidas,
    putSalidas,
    deleteSalidas,
} from "@/app/redux/slices/salidaProductosSlice";
import GenericTable from "@/app/Components/generics/GenericTable";
import GenericModal from "@/app/Components/generics/GenericModal";
import { salidaProductosInterface } from "@/app/interfaces/SalidaProductos";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const SalidaProductos: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const salidas = useSelector(
        (state: RootState) => state.salidaProductos.salidas
    );
    const status = useSelector(
        (state: RootState) => state.salidaProductos.status
    );
    const error = useSelector(
        (state: RootState) => state.salidaProductos.error
    );

    const [selectedSalidas, setSelectedSalidas] = useState<
        salidaProductosInterface[]
    >([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSalida, setSelectedSalida] =
        useState<salidaProductosInterface | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchSalidas());
        }
    }, [status, dispatch]);

    const handleEdit = (salida: salidaProductosInterface) => {
        setSelectedSalida(salida);
        setModalVisible(true);
    };

    const handleDelete = () => {
        if (selectedSalidas.length > 0) {
            const idsToDelete = selectedSalidas.map((salida) => salida.id);
            dispatch(deleteSalidas(idsToDelete)).then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    toast.current?.show({
                        severity: "success",
                        summary: "Eliminación Exitosa",
                        detail: "Las salidas de productos fueron eliminadas",
                        life: 3000,
                    });
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error al Eliminar",
                        detail: "Hubo un error al eliminar las salidas de productos",
                        life: 3000,
                    });
                }
                setSelectedSalidas([]);
            });
        }
    };

    const confirmDelete = () => {
        confirmDialog({
            message:
                "¿Está seguro de que desea eliminar las salidas seleccionadas?",
            header: "Confirmación",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sí",
            rejectLabel: "No",
            accept: handleDelete,
            reject: () => {},
        });
    };

    const handleModalSubmit = async (salida: salidaProductosInterface) => {
        if (selectedSalida) {
            await dispatch(
                putSalidas({
                    id: selectedSalida.id,
                    updatedSalida: salida,
                })
            );
        } else {
            await dispatch(postSalidas(salida));
        }
        setSelectedSalida(null);
        setModalVisible(false);
    };

    const onAfterSubmit = () => {
        dispatch(fetchSalidas());
    };

    return (
        <div className="w-full">
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between px-4">
                <h2 className="text-xl">Salida de Productos</h2>
                <div className="flex gap-2 items-center">
                    {selectedSalidas.length > 0 && (
                        <Button
                            label="Eliminar seleccionados"
                            icon="pi pi-trash"
                            className="bg-[var(--surface-a)] p-2 hover:bg-[var(--red-400)] mt-2 max-w-[300px]"
                            onClick={confirmDelete}
                        />
                    )}
                    <Button
                        label="Añadir salida"
                        icon="pi pi-plus"
                        className="bg-[var(--surface-a)] p-2 hover:bg-[var(--primary-color)] mt-2 max-w-[200px]"
                        onClick={() => setModalVisible(true)}
                    />
                </div>
            </div>
            <GenericTable
                data={salidas}
                columns={[
                    { field: "id", header: "ID" },
                    { field: "producto_final_id", header: "Producto Final Id" },
                    { field: "formula_id", header: "ID Formula" },
                    { field: "numero_lote", header: "Número de lote" },
                    {
                        field: "fecha_salida",
                        header: "Fecha de salida",
                        render: (rowData) =>
                            new Date(
                                rowData.fecha_salida * 1000
                            ).toLocaleDateString(),
                    },
                    { field: "cantidad", header: "Cantidad" },
                    {
                        field: "fecha_caducidad",
                        header: "Fecha de caducidad",
                        render: (rowData) =>
                            rowData.fecha_caducidad
                                ? new Date(
                                      rowData.fecha_caducidad * 1000
                                  ).toLocaleDateString()
                                : "",
                    },
                    { field: "envasado_id", header: "ID Envasado" },
                    { field: "formato_id", header: "ID Formato" },
                    { field: "destino_id", header: "ID Destino" },
                    { field: "vehiculo_id", header: "ID Vehiculo" },
                    { field: "id_proyecto", header: "ID Proyecto" },
                ]}
                selectedItems={selectedSalidas}
                setSelectedItems={setSelectedSalidas}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
            />
            <GenericModal
                visible={modalVisible}
                setVisible={setModalVisible}
                initialValues={
                    selectedSalida || {
                        id: 0,
                        producto_final_id: 0,
                        formula_id: 0,
                        numero_lote: "",
                        fecha_salida: Date.now() / 1000,
                        cantidad: 0,
                        fecha_caducidad: 0,
                        envasado_id: 0,
                        formato_id: 0,
                        destino_id: 0,
                        vehiculo_id: 0,
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
                        key: "formula_id",
                        label: "ID de la Formula",
                        type: "number",
                    },
                    {
                        key: "numero_lote",
                        label: "Número de lote",
                        type: "text",
                    },
                    {
                        key: "fecha_salida",
                        label: "Fecha de salida",
                        type: "date",
                    },
                    { key: "cantidad", label: "Cantidad", type: "number" },
                    {
                        key: "fecha_caducidad",
                        label: "Fecha de caducidad",
                        type: "date",
                    },
                    {
                        key: "envasado_id",
                        label: "ID del Envasado",
                        type: "number",
                    },
                    {
                        key: "formato_id",
                        label: "ID del Formato",
                        type: "number",
                    },
                    {
                        key: "destino_id",
                        label: "ID del Destino",
                        type: "number",
                    },
                    {
                        key: "vehiculo_id",
                        label: "ID del Vehículo",
                        type: "number",
                    },
                    {
                        key: "id_proyecto",
                        label: "ID del Proyecto",
                        type: "number",
                    },
                ]}
                onAfterSubmit={onAfterSubmit}
            />
        </div>
    );
};

export default SalidaProductos;
