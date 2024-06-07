import { proyectosInterface } from "./Proyectos";

export interface operariosInterface {
    id: number;
    nombre: string;
}

export interface getOperariosInterface {
    id: number;
    nombre: string;
    proyecto: proyectosInterface;
}

export interface postOperariosInterface {
    nombre: string;
    id_proyecto: number;
}

export interface putOperariosInterface {
    id: number;
    nombre: string;
    id_proyecto: number;
}
