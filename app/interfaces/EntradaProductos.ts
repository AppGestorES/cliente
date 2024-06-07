import { envasadosInterface } from "./Envasados";
import { operariosInterface } from "./Operarios";
import { proyectosInterface } from "./Proyectos";

export interface EntradaDeProductos {
    id: number;
    producto_final_id: number;
    fecha_entrada: number;
    proveedor: string;
    numero_albaran: string;
    numero_lote: string;
    cantidad_kg: number;
    fecha_caducidad: number;
    envasado_id?: number;
    operario_id?: number;
    id_proyecto?: number;
    proyecto?: proyectosInterface;
    envasado?: envasadosInterface;
    operario?: operariosInterface;
}

export interface getEntradasInterface {
    id: number;
    producto_final_id: number;
    fecha_entrada: number;
    proveedor: string;
    numero_albaran: string;
    numero_lote: string;
    cantidad_kg: number;
    fecha_caducidad: number;
    envasado_id: number;
    operario_id: number;
    id_proyecto: number;
}

export interface postEntradasInterface {
    producto_final_id: number;
    fecha_entrada: number;
    proveedor: string;
    numero_albaran: string;
    numero_lote: string;
    cantidad_kg: number;
    fecha_caducidad: number;
    envasado_id: number;
    operario_id: number;
    id_proyecto: number;
}

export interface putEntradasInterface {
    id: number;
    producto_final_id: number;
    fecha_entrada: number;
    proveedor: string;
    numero_albaran: string;
    numero_lote: string;
    cantidad_kg: number;
    fecha_caducidad: number;
    envasado_id: number;
    operario_id: number;
    id_proyecto: number;
}
