import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";

interface Props<T> {
    data: T[];
    columns: {
        field: keyof T;
        header: string;
        render?: (data: T) => JSX.Element;
    }[];
    selectedItems: T[];
    setSelectedItems: (items: T[]) => void;
    onEdit: (item: T) => void;
    onDelete: (items: T[]) => void;
    loading: boolean;
    error: string | null;
}

const GenericTable = <T extends { id: number }>({
    data,
    columns,
    selectedItems,
    setSelectedItems,
    onEdit,
    onDelete,
    loading,
    error,
}: Props<T>) => {
    const toast = useRef<Toast>(null);

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

    return (
        <div className="w-full mt-4">
            <Toast ref={toast} />
            <DataTable
                value={data}
                className="tabla"
                loading={loading}
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
                selection={selectedItems}
                onSelectionChange={(e) => setSelectedItems(e.value)}
            >
                <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                ></Column>
                {columns.map((col) => (
                    <Column
                        key={col.field as string}
                        field={col.field as string}
                        header={col.header}
                        sortable
                        body={col.render ? col.render : undefined}
                    />
                ))}
                <Column
                    header="Edit"
                    body={(rowData: T) => (
                        <Button
                            icon="pi pi-pencil"
                            onClick={() => onEdit(rowData)}
                        />
                    )}
                />
            </DataTable>
        </div>
    );
};

export default GenericTable;