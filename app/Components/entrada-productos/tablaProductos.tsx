"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fecthEntradaProductos } from "@/app/redux/slice/apiSlice";
import type { RootState, AppDispatch } from "@/app/redux/store";
import { EntradaDeProductos } from "@/app/interfaces/EntradaProductos";
import { formatDate } from "@/app/utils/utils";

interface Props {
    setSelectedProducts: (products: EntradaDeProductos[]) => void;
    setBotonEliminar: (botonEliminar: boolean) => void;
}

const TablaProductos: React.FC<Props> = ({
    setSelectedProducts,
    setBotonEliminar,
}) => {
    const dispatch: AppDispatch = useDispatch();
    const productos = useSelector((state: RootState) => state.api.productos);
    const status = useSelector((state: RootState) => state.api.status);
    const error = useSelector((state: RootState) => state.api.error);
    const [selectedProducts, setSelectedProductsState] = useState<
        EntradaDeProductos[]
    >([]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fecthEntradaProductos());
        }
    }, [status, dispatch]);

    useEffect(() => {
        setSelectedProducts(selectedProducts);
        setBotonEliminar(selectedProducts.length > 0);
    }, [selectedProducts, setSelectedProducts, setBotonEliminar]);

    const columns = [
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

    const renderDateColumn = (
        rowData: EntradaDeProductos,
        field: keyof EntradaDeProductos
    ) => {
        const value = rowData[field];
        return value ? formatDate(value as number) : "";
    };

    return (
        <div className="w-full mt-4">
            <DataTable
                value={productos}
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
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProductsState(e.value)}
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
                            col.field === "fecha_entrada" ||
                            col.field === "fecha_caducidad"
                                ? (rowData: EntradaDeProductos) =>
                                      renderDateColumn(
                                          rowData,
                                          col.field as keyof EntradaDeProductos
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

export default TablaProductos;
