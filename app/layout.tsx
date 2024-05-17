import type { Metadata } from "next";
import "./globals.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { poppins } from "@/public/fonts/fonts";
import "@/public/themes/viva-dark/theme.css";
import "primeicons/primeicons.css";
import Menu from "@/app/components/Layout/Menu";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <PrimeReactProvider>
                <body className={poppins.className}>
                    <div className="flex">
                        <Menu />
                        <div className="p-4 w-full">{children}</div>
                    </div>
                </body>
            </PrimeReactProvider>
        </html>
    );
}
