import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    formulasInterface,
    postFormulasInterface,
    putFormulasInterface,
} from "@/app/interfaces/Formulas";

interface ApiResponse {
    status: number;
    success: boolean;
    result: formulasInterface[];
}

interface ApiState {
    formulas: formulasInterface[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ApiState = {
    formulas: [],
    status: "idle",
    error: null,
};

export const fetchFormulas = createAsyncThunk(
    "formulas/fetchFormulas",
    async () => {
        const response = await fetch("http://localhost:3001/formulas");
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

export const postFormulas = createAsyncThunk(
    "formulas/postFormulas",
    async (newFormula: postFormulasInterface) => {
        const response = await fetch("http://localhost:3001/formulas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFormula),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: {
            status: number;
            success: boolean;
            result: formulasInterface;
        } = await response.json();

        if (!data.success) {
            throw new Error("Failed to post data");
        }

        return data.result;
    }
);

export const putFormulas = createAsyncThunk(
    "formulas/putFormulas",
    async ({
        id,
        updatedFormula,
    }: {
        id: number;
        updatedFormula: putFormulasInterface;
    }) => {
        const response = await fetch(`http://localhost:3001/formulas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFormula),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: {
            status: number;
            success: boolean;
            result: formulasInterface;
        } = await response.json();

        if (!data.success) {
            throw new Error("Failed to update data");
        }

        return data.result;
    }
);

export const deleteFormulas = createAsyncThunk(
    "formulas/deleteFormulas",
    async (ids: number[]) => {
        for (const id of ids) {
            const response = await fetch(
                `http://localhost:3001/formulas/${id}`,
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

const formulasSlice = createSlice({
    name: "formulas",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFormulas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchFormulas.fulfilled,
                (state, action: PayloadAction<formulasInterface[]>) => {
                    state.status = "succeeded";
                    state.formulas = action.payload;
                }
            )
            .addCase(fetchFormulas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(postFormulas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                postFormulas.fulfilled,
                (state, action: PayloadAction<formulasInterface>) => {
                    state.status = "succeeded";
                    state.formulas.push(action.payload);
                }
            )
            .addCase(postFormulas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(putFormulas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                putFormulas.fulfilled,
                (state, action: PayloadAction<formulasInterface>) => {
                    state.status = "succeeded";
                    const index = state.formulas.findIndex(
                        (formula) => formula.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.formulas[index] = action.payload;
                    }
                }
            )
            .addCase(putFormulas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(deleteFormulas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                deleteFormulas.fulfilled,
                (state, action: PayloadAction<number[]>) => {
                    state.status = "succeeded";
                    state.formulas = state.formulas.filter(
                        (formula) => !action.payload.includes(formula.id)
                    );
                }
            )
            .addCase(deleteFormulas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default formulasSlice.reducer;
