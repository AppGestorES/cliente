import { proyectosInterface } from "../../../servidor/src/interfaces/proyectos.interface";

export interface vehiculosInterface {
    id: number;
    matricula: string;
}

export interface getVehiculosInterface {
    id: number;
    matricula: string;
    proyecto: proyectosInterface;
}

export interface postVehiculosInterface {
    matricula: string;
    id_proyecto: number;
}

export interface putVehiculosInterface {
    id: number;
    matricula: string;
    id_proyecto: number;
}
