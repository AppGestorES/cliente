"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProyectos } from "@/app/redux/slice/apiSlice";
import type { RootState, AppDispatch } from "@/app/redux/store";
import Image from "next/image";
import { Button } from "primereact/button";

const TablaProductos: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const proyectos = useSelector((state: RootState) => state.api.proyectos);
    const status = useSelector((state: RootState) => state.api.status);
    const error = useSelector((state: RootState) => state.api.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProyectos());
        }
    }, [status, dispatch]);

    const columns = [
        { field: "nombre", header: "Nombre" },
        { field: "nif", header: "NIF" },
        { field: "direccion", header: "Dirección" },
        { field: "codigo_postal", header: "Código Postal" },
        { field: "poblacion", header: "Población" },
        { field: "telefono", header: "Teléfono" },
        { field: "correo_electronico", header: "Correo Electrónico" },
    ];

    return (
        <div className="w-full mt-4">
            <DataTable
                value={proyectos}
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
                scrollHeight="500px"
            >
                {columns.map((col) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable
                        body={
                            col.field === "logo"
                                ? (rowData: any) => (
                                      <Image
                                          src={rowData.logo}
                                          alt="logo"
                                          width={50}
                                          height={50}
                                      />
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
