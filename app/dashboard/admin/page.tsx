"use client";

import { Toast } from "primereact/toast";
import withAuth from "../withAuth";
import { useEffect, useRef, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { UsuarioInterface } from "@/app/interfaces/Usuario";
import EntradaProductosModal from "@/app/Components/entrada-productos/entradaProductosModal";
import { Button } from "primereact/button";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsuario, fetchUsuarios } from "@/app/redux/slices/userSlice";
import GenericTable from "@/app/Components/generics/GenericTable";
import React from "react";
import EditEntradaProductosModal from "@/app/Components/entrada-productos/editEntradaProductosModal";
import EditUsuarioModal from "@/app/Components/admin/editUsuarioModal";
import ModalUsuarios from "@/app/Components/admin/modalUsuarios";

const AdminPage = () => {
    const toast = useRef<Toast>(null);

    const [selectedUsers, setSelectedUsers] = useState<UsuarioInterface[]>([]);
    const dispatch: AppDispatch = useDispatch();
    const status = useSelector((state: RootState) => state.usuarios.status);
    const usuarios = useSelector((state: RootState) => state.usuarios.usuarios);
    const error = useSelector((state: RootState) => state.usuarios.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUsuarios());
        }
    }, [status, dispatch]);

    const handleDelete = () => {
        if (selectedUsers.length > 0) {
            const idsToDelete = selectedUsers.map((user) => user.id);
            dispatch(deleteUsuario(idsToDelete)).then((response) => {
                if (response.meta.requestStatus == "fulfilled") {
                    toast.current?.show({
                        severity: "success",
                        summary: "Success",
                        detail: "Eliminado con exito",
                        life: 3000,
                    });
                    dispatch(fetchUsuarios());
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Success",
                        detail: "Error al eliminar",
                        life: 3000,
                    });
                }
            });
            setSelectedUsers([]);
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
            <Toast ref={toast} position="bottom-right" />
            <ConfirmDialog />
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between px-4">
                <h2 className="text-xl">Admin</h2>
                <div className="flex gap-2 items-center">
                    {selectedUsers.length > 0 && (
                        <Button
                            label="Eliminar seleccionados"
                            icon="pi pi-trash"
                            severity="danger"
                            onClick={confirmDelete}
                        />
                    )}
                    <ModalUsuarios />
                </div>
            </div>
            <GenericTable
                data={usuarios}
                columns={[
                    { field: "id", header: "ID" },
                    { field: "nombre", header: "Nombre" },
                    { field: "apellido", header: "Apellido" },
                    { field: "identificador", header: "Identificador" },
                    { field: "es_admin", header: "Administrador" },
                    {
                        field: "proyecto_admin",
                        header: "Administrador de proyecto",
                        render: (rowData) => {
                            return rowData.proyecto_admin === 1 ? (
                                <div>Sí</div>
                            ) : (
                                <div>No</div>
                            );
                        },
                    },
                    {
                        field: "proyecto",
                        header: "Proyecto",
                        render: (rowData) => {
                            if (
                                !rowData.proyecto ||
                                rowData.proyecto.id === null
                            ) {
                                return <div>Ninguno</div>;
                            } else {
                                return <div>{rowData.proyecto.id}</div>;
                            }
                        },
                    },
                ]}
                selectedItems={selectedUsers}
                setSelectedItems={setSelectedUsers}
                onDelete={handleDelete}
                loading={status === "loading"}
                error={error}
                editComponent={(item, onHide) => (
                    <EditUsuarioModal usuarios={item} onHide={onHide} />
                )}
            />
        </div>
    );
};

export default withAuth(AdminPage);
