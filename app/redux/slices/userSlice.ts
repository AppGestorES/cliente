import {
    UsuarioInterface,
    postUsuariosInterface,
    putUsuariosInterface,
} from "@/app/interfaces/Usuario";
import { RootState } from "../store";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ApiResponse<T> {
    status: number;
    success: boolean;
    result: T;
}

interface ApiState<T> {
    usuarios: T[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ApiState<UsuarioInterface> = {
    usuarios: [],
    status: "idle",
    error: null,
};

const selectAuthToken = (state: RootState) => state.auth.token;

const fetchWithToken = async (
    url: string,
    options: RequestInit = {},
    token: string | null
) => {
    const headers = new Headers(options.headers || {});
    if (token) {
        headers.append("Authorization", token);
    }
    options.headers = headers;
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const fetchUsuarios = createAsyncThunk(
    "usuarios/fetchUsuarios",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<UsuarioInterface[]> = await fetchWithToken(
            "https://api.appgestor.es/usuarios",
            {},
            token
        );

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const postUsuarios = createAsyncThunk(
    "usuarios/postUsuarios",
    async (newUsuario: postUsuariosInterface, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<UsuarioInterface> = await fetchWithToken(
            "https://api.appgestor.es/usuarios",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUsuario),
            },
            token
        );

        if (!data.success) {
            throw new Error("Failed to post data");
        }

        return data.result;
    }
);

export const putUsuarios = createAsyncThunk(
    "usuarios/putUsuarios",
    async (updatedUser: putUsuariosInterface, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<UsuarioInterface> = await fetchWithToken(
            `https://api.appgestor.es/usuarios/${updatedUser.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            },
            token
        );

        if (!data.success) {
            throw new Error("Failed to update data");
        }

        return data.result;
    }
);

export const deleteUsuario = createAsyncThunk(
    "usuarios/deleteUsuario",
    async (ids: number[], { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const promises = ids.map((id) =>
            fetchWithToken(
                `https://api.appgestor.es/usuarios/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
                token
            )
        );

        await Promise.all(promises);

        return ids;
    }
);

const usuariosSlice = createSlice({
    name: "usuarios",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsuarios.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchUsuarios.fulfilled,
                (state, action: PayloadAction<UsuarioInterface[]>) => {
                    state.status = "succeeded";
                    state.usuarios = action.payload;
                }
            )
            .addCase(fetchUsuarios.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(postUsuarios.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                postUsuarios.fulfilled,
                (state, action: PayloadAction<UsuarioInterface>) => {
                    state.status = "succeeded";
                    state.usuarios.push(action.payload);
                }
            )
            .addCase(postUsuarios.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(putUsuarios.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                putUsuarios.fulfilled,
                (state, action: PayloadAction<UsuarioInterface>) => {
                    state.status = "succeeded";
                    const index = state.usuarios.findIndex(
                        (usuario) => usuario.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.usuarios[index] = action.payload;
                    }
                }
            )
            .addCase(putUsuarios.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(deleteUsuario.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                deleteUsuario.fulfilled,
                (state, action: PayloadAction<number[]>) => {
                    state.status = "succeeded";
                    state.usuarios = state.usuarios.filter(
                        (usuario) => !action.payload.includes(usuario.id)
                    );
                }
            )
            .addCase(deleteUsuario.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default usuariosSlice.reducer;
