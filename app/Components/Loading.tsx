"use client";

import { ProgressSpinner } from "primereact/progressspinner";

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 justify-center items-center h-[100vh]">
            <h1 className="font-semibold text-4xl">
                Esperando a que se te asigne un proyecto...
            </h1>
            <ProgressSpinner />
        </div>
    );
};

export default Loading;
