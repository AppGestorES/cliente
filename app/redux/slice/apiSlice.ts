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
    token: string | null;
}

const initialState: ApiState = {
    proyectos: [],
    status: "idle",
    error: null,
    token: null,
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

export const loginUser = createAsyncThunk(
    "api/loginUser",
    async (usuarioData: { contrasena: string; usuario: string }) => {
        const response = await fetch("http://localhost:3001/iniciarsesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioData),
        });

        if (!response.ok) {
            if (response.status == 404) {
                throw new Error("Crendenciales incorrectas");
            }
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data.result;
    }
);

export const registerUser = createAsyncThunk(
    "api/registerUser",
    async (usuarioData: {
        nombre: string;
        apellido: string;
        contrasena: string;
        identificador: string;
        id_proyecto: number;
    }) => {
        const response = await fetch("http://localhost:3001/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioData),
        });

        if (!response.ok) {
            if (response.status == 409) {
                throw new Error("El usuario ya está registrado");
            }
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data.result;
    }
);

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = null;
        },
    },
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
            })
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload;
                localStorage.setItem("authToken", action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload;
                localStorage.setItem("authToken", action.payload);
            });
    },
});

export const { setToken, clearToken } = apiSlice.actions;

export default apiSlice.reducer;
