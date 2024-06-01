"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/redux/store";
import { salidaProductosInterface } from "@/app/interfaces/SalidaProductos";
import { formatDate } from "@/app/utils/utils";
import { fetchSalidas } from "@/app/redux/slices/salidaProductosSlice";

interface Props {
    setSelectedSalidas: (salidas: salidaProductosInterface[]) => void;
    setBotonEliminar: (botonEliminar: boolean) => void;
}

const TablaSalidaProductos: React.FC<Props> = ({
    setSelectedSalidas,
    setBotonEliminar,
}) => {
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
    const [selectedSalidasState, setSelectedSalidasState] = useState<
        salidaProductosInterface[]
    >([]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchSalidas());
        }
    }, [status, dispatch]);

    useEffect(() => {
        setSelectedSalidas(selectedSalidasState);
        setBotonEliminar(selectedSalidasState.length > 0);
    }, [selectedSalidasState, setSelectedSalidas, setBotonEliminar]);

    const columns = [
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

    const renderDateColumn = (
        rowData: salidaProductosInterface,
        field: keyof salidaProductosInterface
    ) => {
        const value = rowData[field];
        return value ? formatDate(value as number) : "";
    };

    return (
        <div className="w-full mt-4">
            <DataTable
                value={salidas}
                className="tabla"
                loading={status === "loading"}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                stripedRows
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                sortMode="multiple"
                removableSort
                scrollable
                scrollHeight="600px"
                selectionMode="multiple"
                selection={selectedSalidasState}
                onSelectionChange={(e) => setSelectedSalidasState(e.value)}
            >
                <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                ></Column>
                {columns.map((col) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable
                        body={
                            col.field === "fecha_salida" ||
                            col.field === "fecha_caducidad"
                                ? (rowData: salidaProductosInterface) =>
                                      renderDateColumn(
                                          rowData,
                                          col.field as keyof salidaProductosInterface
                                      )
                                : undefined
                        }
                    />
                ))}
            </DataTable>
            {status === "failed" && <p>{error}</p>}
        </div>
    );
};

export default TablaSalidaProductos;
