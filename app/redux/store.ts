import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/app/redux/slices/authSlice";
import controlMateriaPrimaSlice from "@/app/redux/slices/controlMateriaPrimaSlice";
import entradaProductosSlice from "@/app/redux/slices/entradaProductosSlice";

const store = configureStore({
    reducer: {
        entradaProductos: entradaProductosSlice,
        controlMateriaPrima: controlMateriaPrimaSlice,
        auth: authSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
