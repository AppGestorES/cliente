"use client";

import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import store from "@/app/redux/store";
import { poppins } from "@/public/fonts/fonts";
import "@/public/themes/viva-dark/theme.css";
import "primeicons/primeicons.css";
import Menu from "@/app/Components/Layout/Menu";

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
                            "p-4 w-full overflow-auto max-h-screen " +
                            poppins.className
                        }
                    >
                        {children}
                    </div>
                </div>
            </PrimeReactProvider>
        </Provider>
    );
};

export default DashboardProvider;
