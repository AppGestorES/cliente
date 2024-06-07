import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    getProductosFinalesInterface,
    postProductosFinalesInterface,
    putProductosFinalesInterface,
} from "@/app/interfaces/ProductosFinales";
import { RootState } from "@/app/redux/store"; // Import RootState

interface ApiResponse {
    status: number;
    success: boolean;
    result: getProductosFinalesInterface[];
}

interface ApiState {
    productosFinales: getProductosFinalesInterface[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ApiState = {
    productosFinales: [],
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

export const fetchProductosFinales = createAsyncThunk(
    "productosFinales/fetchProductosFinales",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse = await fetchWithToken(
            "http://localhost:3001/productos_finales",
            {},
            token
        );

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const postProductosFinales = createAsyncThunk(
    "productosFinales/postProductosFinales",
    async (newProductoFinal: postProductosFinalesInterface, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: {
            status: number;
            success: boolean;
            result: getProductosFinalesInterface;
        } = await fetchWithToken(
            "http://localhost:3001/productos_finales",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProductoFinal),
            },
            token
        );

        if (!data.success) {
            throw new Error("Failed to post data");
        }

        return data.result;
    }
);

export const putProductosFinales = createAsyncThunk(
    "productosFinales/putProductosFinales",
    async (
        updatedProductoFinal: putProductosFinalesInterface,
        { getState }
    ) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: {
            status: number;
            success: boolean;
            result: getProductosFinalesInterface;
        } = await fetchWithToken(
            `http://localhost:3001/productos_finales/${updatedProductoFinal.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProductoFinal),
            },
            token
        );

        if (!data.success) {
            throw new Error("Failed to update data");
        }

        return data.result;
    }
);

export const deleteProductosFinales = createAsyncThunk(
    "productosFinales/deleteProductosFinales",
    async (ids: number[], { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const promises = ids.map((id) =>
            fetchWithToken(
                `http://localhost:3001/productos_finales/${id}`,
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

const productosFinalesSlice = createSlice({
    name: "productosFinales",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductosFinales.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchProductosFinales.fulfilled,
                (
                    state,
                    action: PayloadAction<getProductosFinalesInterface[]>
                ) => {
                    state.status = "succeeded";
                    state.productosFinales = action.payload;
                }
            )
            .addCase(fetchProductosFinales.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(postProductosFinales.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                postProductosFinales.fulfilled,
                (
                    state,
                    action: PayloadAction<getProductosFinalesInterface>
                ) => {
                    state.status = "succeeded";
                    state.productosFinales.push(action.payload);
                }
            )
            .addCase(postProductosFinales.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(putProductosFinales.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                putProductosFinales.fulfilled,
                (
                    state,
                    action: PayloadAction<getProductosFinalesInterface>
                ) => {
                    state.status = "succeeded";
                    const index = state.productosFinales.findIndex(
                        (producto) => producto.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.productosFinales[index] = action.payload;
                    }
                }
            )
            .addCase(putProductosFinales.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(deleteProductosFinales.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                deleteProductosFinales.fulfilled,
                (state, action: PayloadAction<number[]>) => {
                    state.status = "succeeded";
                    state.productosFinales = state.productosFinales.filter(
                        (producto) => !action.payload.includes(producto.id)
                    );
                }
            )
            .addCase(deleteProductosFinales.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default productosFinalesSlice.reducer;
