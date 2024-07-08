export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENDPOINTS_AUTH = {
    LOGIN: "/iniciarsesion",
    REGISTER: "/registrarSesion",
    VERIFY_TOKEN: "/verificartoken",
};

export const ENDPOINTS_MATERIAS_PRIMAS = {
    MATERIAS_PRIMAS: "/materias_primas",
    GET_BY_NAME: "/materias_primas/nombre/",
    GET_BY_PROYECTO: "/materias_primas/proyecto/",
    PUTDELETE_MATERIAS_PRIMAS: "/materias_primas/"
};

export const ENDPOINTS_ENTRADA_PRODUCTOS = {
    ENTRADA_PRODUCTOS: "/entradas",
    GET_BY_NAME: "/entradas/nombre/",
    GET_BY_PROYECTO: "/entradas/proyecto/",
    PUTDELETE_ENTRADA_PRODUCTOS: "/entradas/"
};

export const ENDPOINTS_FORMULAS = {
    FORMULAS: "/formulas",
    PUTDELETE_FORMULAS: "/formulas/"
};

export const ENDPOINTS_PRODUCTOS_FINALES = {
    PRODUCTOS_FINALES: "/productos_finales",
    PUTDELETE_PRODUCTOS_FINALES: "/productos_finales/"
};

export const ENDPOINTS_SALIDA_PRODUCTOS = {
    SALIDA_PRODUCTOS: "/salidas",
    GET_BY_PRODUCTO_FINAL: "/salidas/producto_final/",
    GET_BY_FECHA_SALIDA: "/salidas/fecha_salida/",
    GET_BY_PROYECTO: "/salidas/proyecto/",
    PUTDELETE_SALIDA_PRODUCTOS: "/salidas/"
};

export const ENDPOINTS_USUARIOS = {
    USUARIOS: "/usuarios",
    PUTDELETE_USUARIOS: "/usuarios/"
};