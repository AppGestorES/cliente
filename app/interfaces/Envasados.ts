import { proyectosInterface } from "./Proyectos";

export interface envasadosInterface {
    id: number;
    nombre: string;
}

export interface getEnvasadosInterface {
    id: number;
    nombre: string;
    proyecto: proyectosInterface;
}

export interface postEnvasadosInterface {
    nombre: string;
    id_proyecto: number;
}

export interface putEnvasadosInterface {
    id: number;
    nombre: string;
    id_proyecto: number;
}
