"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { getMateriasPrimasInterface } from "@/app/interfaces/MateriasPrimas";
import { fetchMateriasPrimas } from "@/app/redux/slices/controlMateriaPrimaSlice";

interface Props {
    setSelectedProducts: (products: getMateriasPrimasInterface[]) => void;
    setBotonEliminar: (botonEliminar: boolean) => void;
}

const TablaControlMateriaPrima: React.FC<Props> = ({
    setSelectedProducts,
    setBotonEliminar,
}) => {
    const dispatch: AppDispatch = useDispatch();
    const productos = useSelector(
        (state: RootState) => state.controlMateriaPrima.materiasPrimas
    );
    const status = useSelector(
        (state: RootState) => state.controlMateriaPrima.status
    );
    const error = useSelector(
        (state: RootState) => state.controlMateriaPrima.error
    );
    const [selectedProducts, setSelectedProductsState] = useState<
        getMateriasPrimasInterface[]
    >([]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMateriasPrimas());
        }
    }, [status, dispatch]);

    useEffect(() => {
        setSelectedProducts(selectedProducts);
        setBotonEliminar(selectedProducts.length > 0);
    }, [selectedProducts, setSelectedProducts, setBotonEliminar]);

    const columns = [
        { field: "id", header: "ID" },
        { field: "nombre", header: "Nombre" },
        { field: "caducidad", header: "Caducidad (días)" },
        { field: "stock_kgs", header: "Stock (kg)" },
        { field: "id_proyecto", header: "ID Proyecto" },
    ];

    return (
        <div className="w-full mt-4">
            <DataTable
                value={productos}
                className="tabla"
                loading={status === "loading"}
                paginator
                rows={10}
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
                    />
                ))}
            </DataTable>
            {status === "failed" && <p>{error}</p>}
        </div>
    );
};

export default TablaControlMateriaPrima;
