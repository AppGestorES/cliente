import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    formulasInterface,
    postFormulasInterface,
    putFormulasInterface,
} from "@/app/interfaces/Formulas";
import { RootState } from "@/app/redux/store";
import { API_URL, ENDPOINTS_FORMULAS } from "@/app/config";

interface ApiResponse<T> {
    status: number;
    success: boolean;
    result: T;
}

interface ApiState<T> {
    formulas: T[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ApiState<formulasInterface> = {
    formulas: [],
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

export const fetchFormulas = createAsyncThunk(
    "formulas/fetchFormulas",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<formulasInterface[]> = await fetchWithToken(
            `${API_URL}${ENDPOINTS_FORMULAS.FORMULAS}`,
            {},
            token
        );

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const postFormulas = createAsyncThunk(
    "formulas/postFormulas",
    async (newFormula: postFormulasInterface, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<formulasInterface> = await fetchWithToken(
            `${API_URL}${ENDPOINTS_FORMULAS.FORMULAS}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newFormula),
            },
            token
        );

        if (!data.success) {
            throw new Error("Failed to post data");
        }

        return data.result;
    }
);

export const putFormulas = createAsyncThunk(
    "formulas/putFormulas",
    async (updatedFormula: putFormulasInterface, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const data: ApiResponse<formulasInterface> = await fetchWithToken(
            `${API_URL}${ENDPOINTS_FORMULAS.PUTDELETE_FORMULAS}${updatedFormula.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFormula),
            },
            token
        );

        if (!data.success) {
            throw new Error("Failed to update data");
        }

        return data.result;
    }
);

export const deleteFormulas = createAsyncThunk(
    "formulas/deleteFormulas",
    async (ids: number[], { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const promises = ids.map((id) =>
            fetchWithToken(
                `${API_URL}${ENDPOINTS_FORMULAS.PUTDELETE_FORMULAS}${id}`,
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
