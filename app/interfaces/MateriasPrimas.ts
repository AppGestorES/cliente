import { proyectosInterface } from "./Proyectos";

export interface materiasPrimasInterface {
    id: number;
    nombre: string;
    caducidad: number;
    stock_kgs: number;
    proyecto: proyectosInterface;
}

export interface getMateriasPrimasInterface {
    id: number;
    nombre: string;
    caducidad: number;
    stock_kgs: number;
    proyecto: proyectosInterface;
}

export interface postMateriasPrimasInterface {
    nombre: string;
    caducidad: number;
    stock_kgs: number;
    id_proyecto: number;
}

export interface putMateriasPrimasInterface {
    id: number;
    nombre: string;
    caducidad: number;
    stock_kgs: number;
    id_proyecto: number;
}
