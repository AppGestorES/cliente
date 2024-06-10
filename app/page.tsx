"use client";
import withAuth from "./dashboard/withAuth";
import "./globals.scss";
import "@/app/utils/themes/viva-dark/theme.css";
import { ProgressSpinner } from 'primereact/progressspinner';

const Home = () => {
    return (
        <div className="flex flex-col gap-8 justify-center items-center h-[100vh]">
            <h1 className="font-semibold text-4xl">Esperando a que se te asigne un proyecto...</h1>
            <ProgressSpinner />
        </div>
    );
}

export default Home;