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
