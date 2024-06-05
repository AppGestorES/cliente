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
        { field: "fecha_salida", header: "Fecha de salida" },
        { field: "cantidad", header: "Cantidad" },
        { field: "fecha_caducidad", header: "Fecha de caducidad" },
        { field: "envasado_id", header: "ID Envasado" },
        { field: "formato_id", header: "ID Formato" },
        { field: "destino_id", header: "ID Destino" },
        { field: "vehiculo_id", header: "ID Vehiculo" },
        { field: "id_proyecto", header: "ID Proyecto" },
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
                    columns={entradaColumns.map((col) => ({
                        ...col,
                        render:
                            col.field === "fecha_entrada" ||
                            col.field === "fecha_caducidad"
                                ? (rowData: EntradaDeProductos) =>
                                      renderDateColumn(rowData, col.field)
                                : undefined,
                    }))}
                    selectedItems={[]}
                    setSelectedItems={() => {}}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    loading={entradaStatus === "loading"}
                    error={entradaError}
                />
            )}
            {selectedTable === "salida" && (
                <GenericTable
                    data={salidaProductos}
                    columns={salidaColumns.map((col) => ({
                        ...col,
                        render:
                            col.field === "fecha_salida" ||
                            col.field === "fecha_caducidad"
                                ? (rowData: salidaProductosInterface) =>
                                      renderDateColumn(rowData, col.field)
                                : undefined,
                    }))}
                    selectedItems={[]}
                    setSelectedItems={() => {}}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    loading={salidaStatus === "loading"}
                    error={salidaError}
                    edit={false}
                />
            )}
        </div>
    );
};

export default TrazabilidadPage;
