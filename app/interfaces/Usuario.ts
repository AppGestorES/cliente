import { proyectosInterface } from "./Proyectos";

export interface UsuarioInterface {
    id: number;
    nombre: string;
    apellido: string;
    foto?: string | null;
    identificador: string;
    proyecto: proyectosInterface;
}
