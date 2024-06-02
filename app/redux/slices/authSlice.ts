import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    status: "idle",
    error: null,
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
        const response = await fetch("http://localhost:3001/usuarios", {
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

const authSlice = createSlice({
    name: "auth",
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
            });
    },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
