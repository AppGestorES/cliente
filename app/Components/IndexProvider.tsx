"use client";

import { poppins } from "@/public/fonts/fonts";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import store from "../redux/store";
import "@/public/themes/viva-dark/theme.css";
import "primeicons/primeicons.css";

const IndexProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <Provider store={store}>
            <PrimeReactProvider>
                <div
                    className={
                        "w-full overflow-auto max-h-screen " + poppins.className
                    }
                >
                    {children}
                </div>
            </PrimeReactProvider>
        </Provider>
    );
};

export default IndexProvider;
