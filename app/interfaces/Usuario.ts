import { proyectosInterface } from "./Proyectos";

export interface UsuarioInterface {
    id: number;
    nombre: string;
    apellido: string;
    foto?: string | null;
    identificador: string;
    proyecto: proyectosInterface;
    es_admin: number;
    proyecto_admin: number;
}

export interface postUsuariosInterface {
    nombre: string;
    apellido: string;
    contrasena: string;
    identificador: string;
}

export interface putUsuariosInterface {
    id: number;
    nombre: string;
    apellido: string;
    foto: string;
    contrasena: string;
    identificador: string;
    id_proyecto: number | null;
    es_admin: number;
    proyecto_admin: number | null;
}
