export interface salidaProductosInterface {
    id: number;
    producto_final_id: number;
    formula_id: number;
    numero_lote: string;
    fecha_salida: number;
    cantidad: number;
    fecha_caducidad: number;
    envasado_id: number;
    formato_id: number;
    destino_id: number;
    vehiculo_id: number;
    id_proyecto: number;
}

export interface getSalidaProductosInterface {
    id: number;
    producto_final_id: number;
    formula_id: number;
    numero_lote: string;
    fecha_salida: number;
    cantidad: number;
    fecha_caducidad: number;
    envasado_id: number;
    formato_id: number;
    destino_id: number;
    vehiculo_id: number;
    id_proyecto: number;
}

export interface postSalidaProductosInterface {
    producto_final_id: number;
    formula_id: number;
    numero_lote: string;
    fecha_salida: number;
    cantidad: number;
    fecha_caducidad?: number; // Optional
    envasado_id?: number; // Optional
    formato_id?: number; // Optional
    destino_id?: number; // Optional
    vehiculo_id?: number; // Optional
    id_proyecto: number;
}

export interface putSalidaProductosInterface {
    id: number;
    producto_final_id: number;
    formula_id: number;
    numero_lote: string;
    fecha_salida: number;
    cantidad: number;
    fecha_caducidad: number;
    envasado_id: number;
    formato_id: number;
    destino_id: number;
    vehiculo_id: number;
    id_proyecto: number;
}
