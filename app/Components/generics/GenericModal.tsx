import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { useRef, useState, useEffect } from "react";

interface Props<T> {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    initialValues: T;
    onSubmit: (values: T) => void;
    fields: { key: keyof T; label: string; type: "text" | "number" | "date" }[];
}

const isDate = (value: any): value is Date => value instanceof Date;

const GenericModal = <T,>({
    visible,
    setVisible,
    initialValues,
    onSubmit,
    fields,
}: Props<T>) => {
    const [formValues, setFormValues] = useState<T>(initialValues);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        setFormValues(initialValues);
    }, [initialValues]);

    const handleChange = (key: keyof T, value: any) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        const updatedValues = { ...formValues };

        fields.forEach((field) => {
            if (field.type === "date") {
                const dateValue = updatedValues[field.key];
                if (isDate(dateValue)) {
                    updatedValues[field.key] = Math.floor(
                        dateValue.getTime() / 1000
                    ) as unknown as T[keyof T];
                }
            }
        });

        onSubmit(updatedValues);
        setVisible(false);
    };

    const footerContent = (
        <div className="flex gap-2">
            <Button
                type="submit"
                label="Guardar"
                icon="pi pi-check"
                onClick={handleSubmit}
                className="mt-2 bg-[var(--primary-color)] p-2"
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
                className="mt-2 hover:bg-[var(--red-400)] p-2"
            />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                header="Añadir"
                footer={footerContent}
                visible={visible}
                className="bg-[var(--surface-c)]"
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => setVisible(false)}
            >
                <form className="w-full grid grid-cols-3 gap-6 p-5">
                    {fields.map((field) => (
                        <div
                            key={field.key as string}
                            className="flex flex-col gap-2 sm:flex-row"
                        >
                            {field.type === "date" ? (
                                <Calendar
                                    value={
                                        formValues[field.key] as unknown as Date
                                    }
                                    onChange={(e: any) =>
                                        handleChange(field.key, e.target.value)
                                    }
                                    placeholder={field.label}
                                    dateFormat="dd/mm/yy"
                                    showButtonBar
                                    className="p-calendar p-component"
                                />
                            ) : (
                                <FloatLabel>
                                    <InputText
                                        id={field.key as string}
                                        value={
                                            formValues[
                                                field.key
                                            ] as unknown as string
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                field.key,
                                                e.target.value
                                            )
                                        }
                                        keyfilter={
                                            field.type === "number"
                                                ? "int"
                                                : undefined
                                        }
                                        className="p-inputtext p-component p-2"
                                    />
                                    <label htmlFor={field.key as string}>
                                        {field.label}
                                    </label>
                                </FloatLabel>
                            )}
                        </div>
                    ))}
                </form>
            </Dialog>
        </>
    );
};

export default GenericModal;
