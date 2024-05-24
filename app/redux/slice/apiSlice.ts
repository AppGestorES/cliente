import { EntradaDeProductos } from "@/app/interfaces/EntradaProductos";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ApiResponse {
    status: number;
    success: boolean;
    result: EntradaDeProductos[];
}

interface ApiState {
    productos: EntradaDeProductos[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    token: string | null;
}

const initialState: ApiState = {
    productos: [],
    status: "idle",
    error: null,
    token: null,
};

export const fecthEntradaProductos = createAsyncThunk(
    "api/fecthEntradaProductos",
    async () => {
        const response = await fetch("http://localhost:3001/entradas");
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

export const deleteEntradaProductos = createAsyncThunk(
    "api/deleteEntradaProductos",
    (ids: number[]) => {
        ids.map(async (id) => {
            const response = await fetch(
                "http://localhost:3001/entradas/" + id,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ids }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        });

        return ids;
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
            .addCase(fecthEntradaProductos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fecthEntradaProductos.fulfilled,
                (state, action: PayloadAction<EntradaDeProductos[]>) => {
                    state.status = "succeeded";
                    state.productos = action.payload;
                }
            )
            .addCase(fecthEntradaProductos.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(deleteEntradaProductos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                deleteEntradaProductos.fulfilled,
                (state, action: PayloadAction<number[]>) => {
                    state.status = "succeeded";
                    state.productos = state.productos.filter(
                        (producto) => !action.payload.includes(producto.id)
                    );
                }
            )
            .addCase(deleteEntradaProductos.rejected, (state, action) => {
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
