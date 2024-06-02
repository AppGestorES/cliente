export interface materiasPrimasInterface {
    id: number;
    nombre: string;
    caducidad: number;
    stock_kgs: number;
    id_proyecto: number;
}

export interface getMateriasPrimasInterface {
    id: number;
    nombre: string;
    caducidad: number;
    stock_kgs: number;
    id_proyecto: number;
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
