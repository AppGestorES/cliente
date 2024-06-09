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
import {
    putSalidaProductosInterface,
    salidaProductosInterface,
} from "@/app/interfaces/SalidaProductos";
import { AppDispatch, RootState } from "@/app/redux/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React from "react";
import SalidaProductosModal from "@/app/Components/salida-productos/modalSalidaProductos";
import EditSalidaProductos from "@/app/Components/salida-productos/editSalidaProductos";
import withAuth from "../withAuth";

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

    return (
        <div className="w-full">
            <Toast ref={toast} position="bottom-right" />
            <ConfirmDialog />
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between px-4">
                <h2 className="text-xl">Salida de Productos</h2>
                <div className="flex gap-2 items-center">
                    {selectedSalidas.length > 0 && (
                        <Button
                            label="Eliminar seleccionados"
                            icon="pi pi-trash"
                            severity="danger"
                            onClick={confirmDelete}
                        />
                    )}
                    <SalidaProductosModal />
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
                        header: "Fecha Salida",
                        render: (rowData) =>
                            rowData.fecha_salida ? (
                                <span>
                                    {new Date(
                                        rowData.fecha_salida * 1000
                                    ).toLocaleDateString()}
                                </span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    { field: "cantidad", header: "Cantidad" },
                    {
                        field: "fecha_caducidad",
                        header: "Fecha Caducidad",
                        render: (rowData) =>
                            rowData.fecha_caducidad ? (
                                <span>
                                    {new Date(
                                        rowData.fecha_caducidad * 1000
                                    ).toLocaleDateString()}
                                </span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    {
                        field: "envasado_id",
                        header: "Envasado",
                        render: (rowData) =>
                            rowData.envasado_id &&
                            rowData.envasado_id.nombre ? (
                                <span>{rowData.envasado_id.nombre}</span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    {
                        field: "formato_id",
                        header: "ID Formato",
                        render: (rowData) =>
                            rowData.formato_id && rowData.formato_id.nombre ? (
                                <span>{rowData.formato_id.nombre}</span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    {
                        field: "destino_id",
                        header: "ID Destino",
                        render: (rowData) =>
                            rowData.destino_id && rowData.destino_id.nombre ? (
                                <span>{rowData.destino_id.nombre}</span>
                            ) : (
                                <React.Fragment />
                            ),
                    },
                    {
                        field: "vehiculo_id",
                        header: "Vehiculo",
                        render: (rowData) =>
                            rowData.vehiculo_id &&
                            rowData.vehiculo_id.matricula ? (
                                <span>{rowData.vehiculo_id.matricula}</span>
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
                selectedItems={selectedSalidas}
                setSelectedItems={setSelectedSalidas}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
                editComponent={(item, onHide) => (
                    <EditSalidaProductos salida={item} onHide={onHide} />
                )}
            />
        </div>
    );
};

export default withAuth(SalidaProductos);
