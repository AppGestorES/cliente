export interface proyectosInterface {
    id: number;
    nombre: string;
    nif: string;
    direccion: string;
    codigo_postal: string;
    poblacion: string;
    telefono: string;
    correo_electronico: string;
    logo: string;
}

export interface getProyectosInterface {
    id: number;
    nombre: string;
    nif: string;
    direccion: string;
    codigo_postal: string;
    poblacion: string;
    telefono: string;
    correo_electronico: string;
    logo: string;
}

export interface postProyectosInterface {
    nombre: string;
    nif: string;
    direccion: string;
    codigo_postal: string;
    poblacion: string;
    telefono: string;
    correo_electronico: string;
    logo: string;
}

export interface putProyectosInterface {
    id: number;
    nombre: string;
    nif: string;
    direccion: string;
    codigo_postal: string;
    poblacion: string;
    telefono: string;
    correo_electronico: string;
    logo: string;
}
