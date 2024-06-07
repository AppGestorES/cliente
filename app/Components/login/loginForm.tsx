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
import Link from "next/link";
import { loginUser } from "@/app/redux/slices/authSlice";
import { sha256 } from "js-sha256";

const schema = z.object({
    nombreUsuario: z.string(),
    contrasena: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
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
            usuario: data.nombreUsuario,
            contrasena: sha256(data.contrasena),
        };

        try {
            await dispatch(loginUser(usuarioData)).unwrap();

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
                <h2 className="text-xl mb-4">Iniciar sesion</h2>
                <form
                    className="flex flex-col w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-4 mb-4">
                        <InputText
                            id="nombreUsuario"
                            placeholder="Nombre de usuario"
                            className="p-2"
                            {...register("nombreUsuario")}
                        />
                        {errors.nombreUsuario && (
                            <span className="text-red-500">
                                {errors.nombreUsuario.message}
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
                    </div>
                    <Link href={"/register"} className="text-xs text-blue-300">
                        Registrarse
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
