export interface EntradaDeProductos {
    id: number;
    producto_final_id?: number;
    fecha_entrada: number;
    proveedor?: string;
    numero_albaran?: string;
    numero_lote?: string;
    cantidad_kg: number;
    fecha_caducidad?: number;
    envasado_id?: number;
    operario_id?: number;
    id_proyecto: number;
}
