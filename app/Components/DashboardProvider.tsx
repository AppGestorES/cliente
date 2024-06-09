"use client";

import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import store from "@/app/redux/store";
import { poppins } from "@/public/fonts/fonts";
import "@/public/themes/viva-dark/theme.css";
import "primeicons/primeicons.css";
import Menu from "@/app/Components/Layout/Menu";
import Header from "./Header";

const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <Provider store={store}>
            <PrimeReactProvider>
                <div className="flex">
                    <Menu />
                    <div
                        className={
                            "w-full overflow-auto max-h-screen mb-4 " +
                            poppins.className
                        }
                    >
                        <Header />
                        <div className="p-4">{children}</div>
                    </div>
                </div>
            </PrimeReactProvider>
        </Provider>
    );
};

export default DashboardProvider;
