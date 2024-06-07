import { Router, useRouter } from "next/router";

export const formatDate = (epoch: number): string => {
    const date = new Date(epoch * 1000);
    return date.toLocaleDateString();
};

export const formatKg = (value: number): string => {
    return `${value} kg`;
};

export const verifyToken = async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:3001/verificartoken", {
        method: "GET",
        headers: {
            Authorization: token + "",
        },
    });

    return response.status;
};
