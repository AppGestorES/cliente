import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store";
import {
    getMateriasPrimasInterface,
    postMateriasPrimasInterface,
    putMateriasPrimasInterface,
} from "@/app/interfaces/MateriasPrimas";

interface ApiResponse<T> {
    status: number;
    success: boolean;
    result: T;
}

interface ApiState<T> {
    materiasPrimas: T[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ApiState<getMateriasPrimasInterface> = {
    materiasPrimas: [],
    status: "idle",
    error: null,
};

// Selector to get the token from the auth slice
const selectAuthToken = (state: RootState) => state.auth.token;

export const fetchMateriasPrimas = createAsyncThunk(
    "materiasPrimas/fetchMateriasPrimas",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const response = await fetch("http://localhost:3001/materias_primas", {
            headers: {
                Authorization: token + "",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: ApiResponse<getMateriasPrimasInterface[]> =
            await response.json();

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const fetchMateriasPrimasByNombre = createAsyncThunk(
    "materiasPrimas/fetchMateriasPrimasByNombre",
    async (nombre: string, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const response = await fetch(
            `http://localhost:3001/materias_primas/nombre/${nombre}`,
            {
                headers: {
                    Authorization: token + "",
                },
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: ApiResponse<getMateriasPrimasInterface[]> =
            await response.json();

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const fetchMateriasPrimasByProyecto = createAsyncThunk(
    "materiasPrimas/fetchMateriasPrimasByProyecto",
    async (id_proyecto: number, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const response = await fetch(
            `http://localhost:3001/materias_primas/proyecto/${id_proyecto}`,
            {
                headers: {
                    Authorization: token + "",
                },
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: ApiResponse<getMateriasPrimasInterface[]> =
            await response.json();

        if (!data.success) {
            throw new Error("Failed to fetch data");
        }

        return data.result;
    }
);

export const postMateriasPrimas = createAsyncThunk(
    "materiasPrimas/postMateriasPrimas",
    async (newMateriaPrima: postMateriasPrimasInterface, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const response = await fetch("http://localhost:3001/materias_primas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token + "",
            },
            body: JSON.stringify(newMateriaPrima),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: ApiResponse<getMateriasPrimasInterface> =
            await response.json();

        if (!data.success) {
            throw new Error("Failed to post data");
        }

        return data.result;
    }
);

export const putMateriasPrimas = createAsyncThunk(
    "materiasPrimas/putMateriasPrimas",
    async (
        {
            id,
            updatedMateriaPrima,
        }: {
            id: number;
            updatedMateriaPrima: putMateriasPrimasInterface;
        },
        { getState }
    ) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const response = await fetch(
            `http://localhost:3001/materias_primas/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token + "",
                },
                body: JSON.stringify(updatedMateriaPrima),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: ApiResponse<getMateriasPrimasInterface> =
            await response.json();

        if (!data.success) {
            throw new Error("Failed to update data");
        }

        return data.result;
    }
);

export const deleteMateriasPrimas = createAsyncThunk(
    "materiasPrimas/deleteMateriasPrimas",
    async (ids: number[], { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        const promises = ids.map((id) =>
            fetch(`http://localhost:3001/materias_primas/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token + "",
                },
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to delete item with id ${id}`);
                }
            })
        );

        await Promise.all(promises);

        return ids;
    }
);

const controlMateriaPrimaSlice = createSlice({
    name: "materiasPrimas",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMateriasPrimas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchMateriasPrimas.fulfilled,
                (
                    state,
                    action: PayloadAction<getMateriasPrimasInterface[]>
                ) => {
                    state.status = "succeeded";
                    state.materiasPrimas = action.payload;
                }
            )
            .addCase(fetchMateriasPrimas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(fetchMateriasPrimasByNombre.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchMateriasPrimasByNombre.fulfilled,
                (
                    state,
                    action: PayloadAction<getMateriasPrimasInterface[]>
                ) => {
                    state.status = "succeeded";
                    state.materiasPrimas = action.payload;
                }
            )
            .addCase(fetchMateriasPrimasByNombre.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(fetchMateriasPrimasByProyecto.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchMateriasPrimasByProyecto.fulfilled,
                (
                    state,
                    action: PayloadAction<getMateriasPrimasInterface[]>
                ) => {
                    state.status = "succeeded";
                    state.materiasPrimas = action.payload;
                }
            )
            .addCase(
                fetchMateriasPrimasByProyecto.rejected,
                (state, action) => {
                    state.status = "failed";
                    state.error =
                        action.error.message || "Something went wrong";
                }
            )
            .addCase(postMateriasPrimas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                postMateriasPrimas.fulfilled,
                (state, action: PayloadAction<getMateriasPrimasInterface>) => {
                    state.status = "succeeded";
                    state.materiasPrimas.push(action.payload);
                }
            )
            .addCase(postMateriasPrimas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(putMateriasPrimas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                putMateriasPrimas.fulfilled,
                (state, action: PayloadAction<getMateriasPrimasInterface>) => {
                    state.status = "succeeded";
                    const index = state.materiasPrimas.findIndex(
                        (materia) => materia.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.materiasPrimas[index] = action.payload;
                    }
                }
            )
            .addCase(putMateriasPrimas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(deleteMateriasPrimas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                deleteMateriasPrimas.fulfilled,
                (state, action: PayloadAction<number[]>) => {
                    state.status = "succeeded";
                    state.materiasPrimas = state.materiasPrimas.filter(
                        (materia) => !action.payload.includes(materia.id)
                    );
                }
            )
            .addCase(deleteMateriasPrimas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default controlMateriaPrimaSlice.reducer;
