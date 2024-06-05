import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    getProductosFinalesInterface,
    postProductosFinalesInterface,
    putProductosFinalesInterface,
} from "@/app/interfaces/ProductosFinales";

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

export const fetchProductosFinales = createAsyncThunk(
    "productosFinales/fetchProductosFinales",
    async () => {
        const response = await fetch("http://localhost:3001/productos_finales");
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

export const postProductosFinales = createAsyncThunk(
    "productosFinales/postProductosFinales",
    async (newProductoFinal: postProductosFinalesInterface) => {
        const response = await fetch(
            "http://localhost:3001/productos_finales",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProductoFinal),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: {
            status: number;
            success: boolean;
            result: getProductosFinalesInterface;
        } = await response.json();

        if (!data.success) {
            throw new Error("Failed to post data");
        }

        return data.result;
    }
);

export const putProductosFinales = createAsyncThunk(
    "productosFinales/putProductosFinales",
    async ({
        id,
        updatedProductoFinal,
    }: {
        id: number;
        updatedProductoFinal: putProductosFinalesInterface;
    }) => {
        const response = await fetch(
            `http://localhost:3001/productos_finales/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProductoFinal),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: {
            status: number;
            success: boolean;
            result: getProductosFinalesInterface;
        } = await response.json();

        if (!data.success) {
            throw new Error("Failed to update data");
        }

        return data.result;
    }
);

export const deleteProductosFinales = createAsyncThunk(
    "productosFinales/deleteProductosFinales",
    async (ids: number[]) => {
        for (const id of ids) {
            const response = await fetch(
                `http://localhost:3001/productos_finales/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        }
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
