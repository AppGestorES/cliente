import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { UsuarioInterface } from "@/app/interfaces/Usuario";

interface UsuariosTableProps {
    data: any[];
    editComponent?: (item: any, onHide: () => void) => JSX.Element | null;
    selectedItems: UsuarioInterface[];
    setSelectedItems: (items: UsuarioInterface[]) => void;
    loading: boolean;
}

const UsuariosTable: React.FC<UsuariosTableProps> = ({
    data,
    editComponent,
    selectedItems,
    setSelectedItems,
    loading,
}) => {
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);
    const [editItem, setEditItem] = useState<any | null>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const handleHide = () => {
        setVisible(false);
        setEditItem(null);
    };

    const header = (
        <div className="table-header">
            <span className="p-input-icon-left flex">
                <InputText
                    type="search"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setGlobalFilter(e.target.value)
                    }
                    placeholder="Buscar..."
                    className="pl-4"
                />
            </span>
        </div>
    );

    const handleEditClick = (item: any) => {
        setEditItem(item);
        setVisible(true);
    };

    return (
        <div>
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
                header={header}
                globalFilter={globalFilter}
                onSelectionChange={(e) => {
                    setSelectedItems(e.value);
                }}
            >
                <Column field="id" header="ID" sortable />
                <Column field="nombre" header="Nombre" sortable />
                <Column field="apellido" header="Apellido" sortable />
                <Column field="identificador" header="Identificador" sortable />
                <Column field="es_admin" header="Administrador" sortable />
                <Column
                    field="proyecto_admin"
                    header="Administrador de proyecto"
                    sortable
                    body={(rowData) =>
                        rowData.proyecto_admin === 1 ? "Sí" : "No"
                    }
                />
                <Column
                    field="proyecto"
                    header="Proyecto"
                    sortable
                    body={(rowData) =>
                        !rowData.proyecto || rowData.proyecto.id === null ? (
                            <div>Ninguno</div>
                        ) : (
                            <div>{rowData.proyecto.id}</div>
                        )
                    }
                />
                <Column
                    header="Editar"
                    body={(rowData) => (
                        <Button
                            icon="pi pi-pencil"
                            onClick={() => handleEditClick(rowData)}
                        />
                    )}
                />
            </DataTable>
            {editItem && editComponent && visible && (
                <div>{editComponent(editItem, handleHide)}</div>
            )}
        </div>
    );
};

export default UsuariosTable;
