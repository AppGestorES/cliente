import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";

const TablaProductos = () => {
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        setProducts([
            {
                id: "1000",
                code: "f230fh0g3",
                name: "Bamboo Watch",
                description: "Product Description",
                image: "bamboo-watch.jpg",
                price: 65,
                category: "Accessories",
                quantity: 24,
                inventoryStatus: "INSTOCK",
                rating: 5,
            },
        ]);
    }, []);

    const columns = [
        { field: "code", header: "Code" },
        { field: "name", header: "Name" },
        { field: "category", header: "Category" },
        { field: "quantity", header: "Quantity" },
    ];

    return (
        <div className="w-full mt-4">
            <DataTable value={products} className="tabla">
                {columns.map((col, i) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                    />
                ))}
            </DataTable>
        </div>
    );
};

export default TablaProductos;
