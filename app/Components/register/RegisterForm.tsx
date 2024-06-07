"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/app/redux/store";
import { registerUser } from "@/app/redux/slices/authSlice";
import Link from "next/link";
import { sha256 } from "js-sha256";

const schema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    apellido: z.string().min(1, "El apellido es requerido"),
    correo: z.string().email("Correo inválido"),
    contrasena: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    nombreUsuario: z.string().min(1, "El nombre de usuario es requerido"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
    const toast = useRef<Toast>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        const usuarioData = {
            nombre: data.nombre,
            apellido: data.apellido,
            contrasena: sha256(data.contrasena),
            identificador: data.nombreUsuario,
            id_proyecto: 1,
        };

        try {
            await dispatch(registerUser(usuarioData)).unwrap();

            toast.current?.show({
                severity: "success",
                summary: "Registro exitoso",
                detail: "Los datos han sido registrados correctamente",
            });

            router.push("/dashboard");
        } catch (error: any) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.message,
            });
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="w-full h-screen p-4 flex items-center justify-center">
            <Toast ref={toast} />
            <div className="w-[70vw] md:w-[30vw] h-auto rounded-md bg-[var(--surface-c)] p-4">
                <h2 className="text-xl mb-4">Registrar</h2>
                <form
                    className="flex flex-col w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex gap-2 mb-4">
                        <div className="flex flex-col w-1/2">
                            <InputText
                                id="nombre"
                                placeholder="Nombre"
                                className="p-2 w-full"
                                {...register("nombre")}
                            />
                            {errors.nombre && (
                                <span className="text-red-500">
                                    {errors.nombre.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col w-1/2">
                            <InputText
                                id="apellido"
                                placeholder="Apellido"
                                className="p-2 w-full"
                                {...register("apellido")}
                            />
                            {errors.apellido && (
                                <span className="text-red-500">
                                    {errors.apellido.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mb-4">
                        <InputText
                            id="correo"
                            placeholder="Correo"
                            className="p-2"
                            {...register("correo")}
                        />
                        {errors.correo && (
                            <span className="text-red-500">
                                {errors.correo.message}
                            </span>
                        )}
                        <InputText
                            type="password"
                            id="contrasena"
                            placeholder="Contraseña"
                            className="p-2"
                            {...register("contrasena")}
                        />
                        {errors.contrasena && (
                            <span className="text-red-500">
                                {errors.contrasena.message}
                            </span>
                        )}
                        <InputText
                            id="nombreUsuario"
                            placeholder="Nombre de Usuario"
                            className="p-2"
                            {...register("nombreUsuario")}
                        />
                        {errors.nombreUsuario && (
                            <span className="text-red-500">
                                {errors.nombreUsuario.message}
                            </span>
                        )}
                    </div>
                    <Link href={"/login"} className="text-xs text-blue-300">
                        Iniciar sesion
                    </Link>
                    <Button
                        type="submit"
                        label="Confirmar"
                        className="w-full p-2 bg-[var(--surface-c)] hover:bg-[var(--primary-color)] mt-2"
                    />
                </form>
            </div>
        </div>
    );
}
