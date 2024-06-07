"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntradaProductos } from "@/app/redux/slices/entradaProductosSlice";
import { fetchSalidas } from "@/app/redux/slices/salidaProductosSlice";
import GenericTable from "@/app/Components/generics/GenericTable";
import { EntradaDeProductos } from "@/app/interfaces/EntradaProductos";
import { salidaProductosInterface } from "@/app/interfaces/SalidaProductos";
import { AppDispatch, RootState } from "@/app/redux/store";
import { Button } from "primereact/button";
import React from "react";

const TrazabilidadPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const entradaProductos = useSelector(
        (state: RootState) => state.entradaProductos.productos
    );
    const salidaProductos = useSelector(
        (state: RootState) => state.salidaProductos.salidas
    );
    const entradaStatus = useSelector(
        (state: RootState) => state.entradaProductos.status
    );
    const salidaStatus = useSelector(
        (state: RootState) => state.salidaProductos.status
    );
    const entradaError = useSelector(
        (state: RootState) => state.entradaProductos.error
    );
    const salidaError = useSelector(
        (state: RootState) => state.salidaProductos.error
    );

    const [selectedSalidas, setSelectedSalidas] = useState<
        salidaProductosInterface[]
    >([]);
    const [selectedProducts, setSelectedProducts] = useState<
        EntradaDeProductos[]
    >([]);

    const [selectedTable, setSelectedTable] = useState<"entrada" | "salida">(
        "entrada"
    );

    useEffect(() => {
        if (entradaStatus === "idle") {
            dispatch(fetchEntradaProductos());
        }
        if (salidaStatus === "idle") {
            dispatch(fetchSalidas());
        }
    }, [entradaStatus, salidaStatus, dispatch]);

    const entradaColumns = [
        { field: "id", header: "ID" },
        { field: "producto_final_id", header: "Producto Final Id" },
        { field: "fecha_entrada", header: "Fecha Entrada" },
        { field: "proveedor", header: "Proveedor" },
        { field: "numero_albaran", header: "Número Albaran" },
        { field: "numero_lote", header: "Numero lote" },
        { field: "cantidad_kg", header: "Cantidad (KG)" },
        { field: "fecha_caducidad", header: "Fecha Caducidad" },
        { field: "envasado_id", header: "ID Envasado" },
        { field: "operario_id", header: "ID Operario" },
        { field: "id_proyecto", header: "ID Proyecto" },
    ];

    const salidaColumns = [
        { field: "id", header: "ID" },
        { field: "producto_final_id", header: "Producto Final Id" },
        { field: "formula_id", header: "ID Formula" },
        { field: "numero_lote", header: "Número de lote" },
        {
            field: "fecha_salida",
            header: "Fecha Salida",
            render: (rowData: any) =>
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
            render: (rowData: any) =>
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
            header: "ID Envasado",
            render: (rowData: any) =>
                rowData.envasado_id && rowData.envasado_id.id ? (
                    <span>{rowData.envasado_id.id}</span>
                ) : (
                    <React.Fragment />
                ),
        },
        {
            field: "formato_id",
            header: "ID Formato",
            render: (rowData: any) =>
                rowData.formato_id && rowData.formato_id.id ? (
                    <span>{rowData.formato_id.id}</span>
                ) : (
                    <React.Fragment />
                ),
        },
        {
            field: "destino_id",
            header: "ID Destino",
            render: (rowData: any) =>
                rowData.destino_id && rowData.destino_id.id ? (
                    <span>{rowData.destino_id.id}</span>
                ) : (
                    <React.Fragment />
                ),
        },
        {
            field: "vehiculo_id",
            header: "ID Vehiculo",
            render: (rowData: any) =>
                rowData.vehiculo_id && rowData.vehiculo_id.id ? (
                    <span>{rowData.vehiculo_id.id}</span>
                ) : (
                    <React.Fragment />
                ),
        },
        {
            field: "proyecto",
            header: "ID proyecto",
            render: (rowData: any) =>
                rowData.proyecto && rowData.proyecto.id ? (
                    <span>{rowData.proyecto.id}</span>
                ) : (
                    <React.Fragment />
                ),
        },
    ];

    const renderDateColumn = (rowData: any, field: string) => {
        const value = rowData[field];
        return value ? new Date(value * 1000).toLocaleDateString() : "";
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center px-4">
                <h2 className="text-xl">Trazabilidad</h2>
                <div className="flex gap-2">
                    <Button
                        label="Entradas de Productos"
                        className={`p-2 ${
                            selectedTable === "entrada"
                                ? "bg-[var(--primary-color)]"
                                : "bg-[var(--surface-a)]"
                        }`}
                        onClick={() => setSelectedTable("entrada")}
                    />
                    <Button
                        label="Salidas de Productos"
                        className={`p-2 ${
                            selectedTable === "salida"
                                ? "bg-[var(--primary-color)]"
                                : "bg-[var(--surface-a)]"
                        }`}
                        onClick={() => setSelectedTable("salida")}
                    />
                </div>
            </div>
            {selectedTable === "entrada" && (
                <GenericTable
                    data={entradaProductos}
                    columns={[
                        { field: "id", header: "ID" },
                        {
                            field: "producto_final_id",
                            header: "Producto Final Id",
                        },
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
                        { field: "proveedor", header: "Proveedor" },
                        { field: "numero_albaran", header: "Número Albaran" },
                        { field: "numero_lote", header: "Número de lote" },
                        { field: "cantidad_kg", header: "Cantidad (KG)" },
                        {
                            field: "envasado_id",
                            header: "ID Envasado",
                            render: (rowData) =>
                                rowData.envasado && rowData.envasado.id ? (
                                    <span>{rowData.envasado.id}</span>
                                ) : (
                                    <React.Fragment />
                                ),
                        },
                        {
                            field: "operario_id",
                            header: "ID Operario",
                            render: (rowData) =>
                                rowData.operario && rowData.operario.id ? (
                                    <span>{rowData.operario.id}</span>
                                ) : (
                                    <React.Fragment />
                                ),
                        },
                        {
                            field: "id_proyecto",
                            header: "ID Proyecto",
                            render: (rowData) =>
                                rowData.proyecto && rowData.proyecto.id ? (
                                    <span>{rowData.proyecto.id}</span>
                                ) : (
                                    <React.Fragment />
                                ),
                        },
                    ]}
                    selectedItems={selectedProducts}
                    setSelectedItems={setSelectedProducts}
                    onDelete={() => {}}
                    loading={entradaStatus === "loading"}
                    error={entradaError}
                />
            )}
            {selectedTable === "salida" && (
                <GenericTable
                    onDelete={() => {}}
                    data={salidaProductos}
                    columns={[
                        { field: "id", header: "ID" },
                        {
                            field: "producto_final_id",
                            header: "Producto Final Id",
                        },
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
                            header: "ID Envasado",
                            render: (rowData) =>
                                rowData.envasado_id &&
                                rowData.envasado_id.id ? (
                                    <span>{rowData.envasado_id.id}</span>
                                ) : (
                                    <React.Fragment />
                                ),
                        },
                        {
                            field: "formato_id",
                            header: "ID Formato",
                            render: (rowData) =>
                                rowData.formato_id && rowData.formato_id.id ? (
                                    <span>{rowData.formato_id.id}</span>
                                ) : (
                                    <React.Fragment />
                                ),
                        },
                        {
                            field: "destino_id",
                            header: "ID Destino",
                            render: (rowData) =>
                                rowData.destino_id && rowData.destino_id.id ? (
                                    <span>{rowData.destino_id.id}</span>
                                ) : (
                                    <React.Fragment />
                                ),
                        },
                        {
                            field: "vehiculo_id",
                            header: "ID Vehiculo",
                            render: (rowData) =>
                                rowData.vehiculo_id &&
                                rowData.vehiculo_id.id ? (
                                    <span>{rowData.vehiculo_id.id}</span>
                                ) : (
                                    <React.Fragment />
                                ),
                        },
                        {
                            field: "proyecto",
                            header: "ID proyecto",
                            render: (rowData) =>
                                rowData.proyecto && rowData.proyecto.id ? (
                                    <span>{rowData.proyecto.id}</span>
                                ) : (
                                    <React.Fragment />
                                ),
                        },
                    ]}
                    selectedItems={selectedSalidas}
                    setSelectedItems={setSelectedSalidas}
                    loading={salidaStatus === "loading"}
                    error={salidaError}
                />
            )}
        </div>
    );
};

export default TrazabilidadPage;
