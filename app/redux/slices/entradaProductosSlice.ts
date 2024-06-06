import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    postEntradasInterface,
    putEntradasInterface,
    getEntradasInterface,
} from "@/app/interfaces/EntradaProductos";
import { RootState } from "@/app/redux/store";

interface ApiResponse<T> {
    status: number;
    success: boolean;
    result: T;
}

interface ApiState<T> {
    productos: T[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ApiState<getEntradasInterface> = {
    productos: [],
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

export const fetchEntradaProductos = createAsyncThunk(
    "entradaProductos/fetchEntradaProductos",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<getEntradasInterface[]> = await fetchWithToken(
            "http://localhost:3001/entradas",
            {},
            token
        );

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const postEntradaProductos = createAsyncThunk(
    "entradaProductos/postEntradaProductos",
    async (newEntrada: postEntradasInterface, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<getEntradasInterface> = await fetchWithToken(
            "http://localhost:3001/entradas",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEntrada),
            },
            token
        );

        if (!data.success) {
            throw new Error("Failed to post data");
        }

        return data.result;
    }
);

export const putEntradaProductos = createAsyncThunk(
    "entradaProductos/putEntradaProductos",
    async (
        {
            id,
            updatedProduct,
        }: {
            id: number;
            updatedProduct: putEntradasInterface;
        },
        { getState }
    ) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<getEntradasInterface> = await fetchWithToken(
            `http://localhost:3001/entradas/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            },
            token
        );

        if (!data.success) {
            throw new Error("Failed to update data");
        }

        return data.result;
    }
);

export const deleteEntradaProductos = createAsyncThunk(
    "entradaProductos/deleteEntradaProductos",
    async (ids: number[], { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const promises = ids.map((id) =>
            fetchWithToken(
                `http://localhost:3001/entradas/${id}`,
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

const entradaProductosSlice = createSlice({
    name: "entradaProductos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEntradaProductos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchEntradaProductos.fulfilled,
                (state, action: PayloadAction<getEntradasInterface[]>) => {
                    state.status = "succeeded";
                    state.productos = action.payload;
                }
            )
            .addCase(fetchEntradaProductos.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(postEntradaProductos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                postEntradaProductos.fulfilled,
                (state, action: PayloadAction<getEntradasInterface>) => {
                    state.status = "succeeded";
                    state.productos.push(action.payload);
                }
            )
            .addCase(postEntradaProductos.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(putEntradaProductos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                putEntradaProductos.fulfilled,
                (state, action: PayloadAction<getEntradasInterface>) => {
                    state.status = "succeeded";
                    const index = state.productos.findIndex(
                        (producto) => producto.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.productos[index] = action.payload;
                    }
                }
            )
            .addCase(putEntradaProductos.rejected, (state, action) => {
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
            });
    },
});

export default entradaProductosSlice.reducer;
