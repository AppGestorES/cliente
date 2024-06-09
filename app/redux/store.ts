import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/app/redux/slices/authSlice";
import controlMateriaPrimaSlice from "@/app/redux/slices/controlMateriaPrimaSlice";
import entradaProductosSlice from "@/app/redux/slices/entradaProductosSlice";
import salidaProductosSlice from "@/app/redux/slices/salidaProductosSlice";
import materiasPrimasSlice from "./slices/materiasPrimasSlice";
import formulasSlice from "./slices/formulasSlice";
import prodcutosFinalesSlice from "./slices/prodcutosFinalesSlice";
import usuariosSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        entradaProductos: entradaProductosSlice,
        controlMateriaPrima: controlMateriaPrimaSlice,
        auth: authSlice,
        salidaProductos: salidaProductosSlice,
        materiasPrimas: materiasPrimasSlice,
        formulas: formulasSlice,
        productosFinales: prodcutosFinalesSlice,
        usuarios: usuariosSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
