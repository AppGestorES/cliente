import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store";
import { UsuarioInterface } from "@/app/interfaces/Usuario";

interface AuthState {
    token: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    usuario: UsuarioInterface | null;
}

const initialState: AuthState = {
    token:
        typeof window !== "undefined" ? localStorage.getItem("authToken") : "",
    status: "idle",
    error: null,
    usuario: null,
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (usuarioData: { contrasena: string; usuario: string }) => {
        const response = await fetch("http://localhost:3001/iniciarsesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioData),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Credenciales incorrectas");
            }
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data.result;
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (usuarioData: {
        nombre: string;
        apellido: string;
        contrasena: string;
        identificador: string;
        id_proyecto: number;
    }) => {
        const response = await fetch("http://localhost:3001/registrarSesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioData),
        });

        if (!response.ok) {
            if (response.status === 409) {
                throw new Error("El usuario ya está registrado");
            }
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data.result;
    }
);

export const verifyUser = createAsyncThunk("auth/verifyUser", async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:3001/verificartoken", {
        method: "GET",
        headers: {
            Authorization: token + "",
        },
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.status !== 200) {
        throw new Error("Token verification failed");
    }

    return data.result[0];
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("authToken", action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem("authToken");
            state.usuario = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload;
                localStorage.setItem("authToken", action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
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
            .addCase(verifyUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                verifyUser.fulfilled,
                (state, action: PayloadAction<UsuarioInterface>) => {
                    state.status = "succeeded";
                    state.usuario = action.payload;
                }
            )
            .addCase(verifyUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const { setToken, clearToken } = authSlice.actions;

export const getToken = (state: RootState): string | null => state.auth.token;
export const getUsuario = (state: RootState): UsuarioInterface | null =>
    state.auth.usuario;

export default authSlice.reducer;
