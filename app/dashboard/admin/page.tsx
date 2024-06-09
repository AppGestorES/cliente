"use client";

import { Toast } from "primereact/toast";
import withAuth from "../withAuth";
import { useEffect, useRef, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { UsuarioInterface } from "@/app/interfaces/Usuario";
import { Button } from "primereact/button";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsuario, fetchUsuarios } from "@/app/redux/slices/userSlice";
import EditUsuarioModal from "@/app/Components/admin/editUsuarioModal";
import ModalUsuarios from "@/app/Components/admin/modalUsuarios";
import UsuariosTable from "@/app/Components/admin/adminTable";

const AdminPage = () => {
    const toast = useRef<Toast>(null);

    const [selectedUser, setSelectedUser] = useState<UsuarioInterface | null>(
        null
    );
    const dispatch: AppDispatch = useDispatch();
    const status = useSelector((state: RootState) => state.usuarios.status);
    const usuarios = useSelector((state: RootState) => state.usuarios.usuarios);
    const error = useSelector((state: RootState) => state.usuarios.error);
    const [selectedUsers, setSelectedUsers] = useState<UsuarioInterface[]>([]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUsuarios());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (error) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error,
                life: 3000,
            });
        }
    }, [error]);

    const handleDelete = () => {
        if (selectedUser) {
            dispatch(deleteUsuario([selectedUser.id])).then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    toast.current?.show({
                        severity: "success",
                        summary: "Success",
                        detail: "Eliminado con éxito",
                        life: 3000,
                    });
                    dispatch(fetchUsuarios());
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Error al eliminar",
                        life: 3000,
                    });
                }
            });
            setSelectedUser(null);
        }
    };

    const confirmDelete = () => {
        confirmDialog({
            message:
                "¿Está seguro de que desea eliminar el usuario seleccionado?",
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
                    {selectedUser && (
                        <Button
                            label="Eliminar seleccionado"
                            icon="pi pi-trash"
                            severity="danger"
                            onClick={confirmDelete}
                        />
                    )}
                    <ModalUsuarios />
                </div>
            </div>
            <UsuariosTable
                selectedItems={selectedUsers}
                setSelectedItems={setSelectedUsers}
                data={usuarios}
                loading={status === "loading"}
                editComponent={(item, onHide) => (
                    <EditUsuarioModal usuarios={item} onHide={onHide} />
                )}
            />
        </div>
    );
};

export default withAuth(AdminPage);
