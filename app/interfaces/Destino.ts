import { proyectosInterface } from "./Proyectos";

export interface destinosInterface {
    id: number;
    nombre: string;
    id_proyecto: number;
}

export interface getDestinosInterface {
    id: number;
    nombre: string;
    proyecto: proyectosInterface;
}

export interface postDestinosInterface {
    nombre: string;
    id_proyecto: number;
}

export interface putDestinosInterface {
    nombre: string;
}
