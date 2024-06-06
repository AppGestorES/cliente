import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    getSalidaProductosInterface,
    postSalidaProductosInterface,
    putSalidaProductosInterface,
} from "@/app/interfaces/SalidaProductos";
import { RootState } from "@/app/redux/store";

interface ApiResponse<T> {
    status: number;
    success: boolean;
    result: T;
}

interface ApiState<T> {
    salidas: T[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ApiState<getSalidaProductosInterface> = {
    salidas: [],
    status: "idle",
    error: null,
};

// Selector to get the token from the auth slice
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

export const fetchSalidas = createAsyncThunk(
    "salidaProductos/fetchSalidas",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<getSalidaProductosInterface[]> =
            await fetchWithToken("http://localhost:3001/salidas", {}, token);

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const fetchSalidasByProductoFinal = createAsyncThunk(
    "salidaProductos/fetchSalidasByProductoFinal",
    async (producto_final_id: number, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<getSalidaProductosInterface[]> =
            await fetchWithToken(
                `http://localhost:3001/salidas/producto_final/${producto_final_id}`,
                {},
                token
            );

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const fetchSalidasByFechaSalida = createAsyncThunk(
    "salidaProductos/fetchSalidasByFechaSalida",
    async (fecha_salida: number, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<getSalidaProductosInterface[]> =
            await fetchWithToken(
                `http://localhost:3001/salidas/fecha_salida/${fecha_salida}`,
                {},
                token
            );

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const fetchSalidasByProyecto = createAsyncThunk(
    "salidaProductos/fetchSalidasByProyecto",
    async (id_proyecto: number, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<getSalidaProductosInterface[]> =
            await fetchWithToken(
                `http://localhost:3001/salidas/proyecto/${id_proyecto}`,
                {},
                token
            );

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const postSalidas = createAsyncThunk(
    "salidaProductos/postSalidas",
    async (newSalida: postSalidaProductosInterface, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<getSalidaProductosInterface> =
            await fetchWithToken(
                "http://localhost:3001/salidas",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newSalida),
                },
                token
            );

        if (!data.success) {
            throw new Error("Failed to post data");
        }

        return data.result;
    }
);

export const putSalidas = createAsyncThunk(
    "salidaProductos/putSalidas",
    async (updatedSalida: putSalidaProductosInterface, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<getSalidaProductosInterface> =
            await fetchWithToken(
                `http://localhost:3001/salidas/${updatedSalida.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedSalida),
                },
                token
            );

        if (!data.success) {
            throw new Error("Failed to update data");
        }

        return data.result;
    }
);

export const deleteSalidas = createAsyncThunk(
    "salidaProductos/deleteSalidas",
    async (ids: number[], { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const promises = ids.map((id) =>
            fetchWithToken(
                `http://localhost:3001/salidas/${id}`,
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

const salidaProductosSlice = createSlice({
    name: "salidaProductos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSalidas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchSalidas.fulfilled,
                (
                    state,
                    action: PayloadAction<getSalidaProductosInterface[]>
                ) => {
                    state.status = "succeeded";
                    state.salidas = action.payload;
                }
            )
            .addCase(fetchSalidas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(fetchSalidasByProductoFinal.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchSalidasByProductoFinal.fulfilled,
                (
                    state,
                    action: PayloadAction<getSalidaProductosInterface[]>
                ) => {
                    state.status = "succeeded";
                    state.salidas = action.payload;
                }
            )
            .addCase(fetchSalidasByProductoFinal.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(fetchSalidasByFechaSalida.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchSalidasByFechaSalida.fulfilled,
                (
                    state,
                    action: PayloadAction<getSalidaProductosInterface[]>
                ) => {
                    state.status = "succeeded";
                    state.salidas = action.payload;
                }
            )
            .addCase(fetchSalidasByFechaSalida.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(fetchSalidasByProyecto.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchSalidasByProyecto.fulfilled,
                (
                    state,
                    action: PayloadAction<getSalidaProductosInterface[]>
                ) => {
                    state.status = "succeeded";
                    state.salidas = action.payload;
                }
            )
            .addCase(fetchSalidasByProyecto.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(postSalidas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                postSalidas.fulfilled,
                (state, action: PayloadAction<getSalidaProductosInterface>) => {
                    state.status = "succeeded";
                    state.salidas.push(action.payload);
                }
            )
            .addCase(postSalidas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(putSalidas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                putSalidas.fulfilled,
                (state, action: PayloadAction<getSalidaProductosInterface>) => {
                    state.status = "succeeded";
                    const index = state.salidas.findIndex(
                        (salida) => salida.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.salidas[index] = action.payload;
                    }
                }
            )
            .addCase(putSalidas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(deleteSalidas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                deleteSalidas.fulfilled,
                (state, action: PayloadAction<number[]>) => {
                    state.status = "succeeded";
                    state.salidas = state.salidas.filter(
                        (salida) => !action.payload.includes(salida.id)
                    );
                }
            )
            .addCase(deleteSalidas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default salidaProductosSlice.reducer;
