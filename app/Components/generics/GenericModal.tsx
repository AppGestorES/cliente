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
    onSuccess: () => void;
    fields: { key: keyof T; label: string; type: "text" | "number" | "date" }[];
}

const GenericModal = <T,>({
    visible,
    setVisible,
    initialValues,
    onSubmit,
    onSuccess,
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
                const dateValue = formValues[field.key];
                if (dateValue instanceof Date) {
                    updatedValues[field.key] = Math.floor(
                        dateValue.getTime() / 1000
                    ) as unknown as T[keyof T];
                }
            }
        });

        onSubmit(updatedValues);
        setVisible(false);
        onSuccess();
    };

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
