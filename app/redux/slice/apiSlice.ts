import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Proyecto {
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

interface ApiResponse {
    status: number;
    success: boolean;
    result: Proyecto[];
}

interface ApiState {
    proyectos: Proyecto[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ApiState = {
    proyectos: [],
    status: "idle",
    error: null,
};

export const fetchProyectos = createAsyncThunk(
    "api/fetchProyectos",
    async () => {
        const response = await fetch("http://localhost:3001/proyectos");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data: ApiResponse = await response.json();
        if (!data.success) {
            throw new Error("Failed to fetch data");
        }
        return data.result;
    }
);

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProyectos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchProyectos.fulfilled,
                (state, action: PayloadAction<Proyecto[]>) => {
                    state.status = "succeeded";
                    state.proyectos = action.payload;
                }
            )
            .addCase(fetchProyectos.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default apiSlice.reducer;
