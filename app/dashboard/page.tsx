"use client";
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { fetchEntradaProductos } from "../redux/slices/entradaProductosSlice";
import { fetchSalidas } from "../redux/slices/salidaProductosSlice";
import { useRouter } from "next/navigation";
import { UsuarioInterface } from "../interfaces/Usuario";
import { useSelector } from "react-redux";
import { verifyUser } from "../redux/slices/authSlice";
import withAuth from "./withAuth";

const Dashboard = () => {
    const dispatch: AppDispatch = useDispatch();
    const [totalProductos, setTotalProductos] = useState(0);
    const [totalCaduca, setTotalCaduca] = useState(0);
    const [totalUnMes, setTotalUnMes] = useState(0);
    const [totalSalida, setTotalSalida] = useState(0);
    const [totalEntrada, setTotalEntrada] = useState(0);
    const [visible, setVisible] = useState(false);

    const returnProductos = async () => {
        const productos: any = await dispatch(fetchEntradaProductos());
        setTotalProductos(productos.payload.length);
    };

    const returnCaduca = async () => {
        const productos: any = await dispatch(fetchEntradaProductos());
        let cont: number = 0;
        const fechaActual = new Date();

        productos.payload.forEach((e: any) => {
            const fechaEpoch = new Date(e.fecha_caducidad * 1000);
            if (fechaEpoch.getTime() > fechaActual.getTime()) {
                const diferencia = fechaEpoch.getTime() - fechaActual.getTime();
                const unaSemanaEnMilisegundos = 7 * 24 * 60 * 60 * 1000;
                if (diferencia < unaSemanaEnMilisegundos) {
                    cont++;
                }
            }
        });
        setTotalCaduca(cont);
    };

    const returnUnMes = async () => {
        const productos: any = await dispatch(fetchEntradaProductos());
        let cont: number = 0;
        const fechaActual = new Date();

        productos.payload.forEach((e: any) => {
            const fechaCaducidad = new Date(e.fecha_caducidad * 1000);
            const diferencia = fechaCaducidad.getTime() - fechaActual.getTime();
            const unMesEnMilisegundos = 30 * 24 * 60 * 60 * 1000;

            if (diferencia > 0 && diferencia < unMesEnMilisegundos) {
                cont++;
            }
        });

        setTotalUnMes(cont);
    };

    const returnSalidaUnMes = async () => {
        const salidas: any = await dispatch(fetchSalidas());
        let cont: number = 0;
        const fechaActual = new Date();

        salidas.payload.forEach((e: any) => {
            const fechaCaducidad = new Date(e.fecha_salida * 1000);
            const diferencia = fechaActual.getTime() - fechaCaducidad.getTime();
            const unMesEnMilisegundos = 30 * 24 * 60 * 60 * 1000;

            if (diferencia > 0 && diferencia < unMesEnMilisegundos) {
                cont++;
            }
        });

        setTotalSalida(cont);
    };

    const returnEntradasUnMes = async () => {
        const entradas: any = await dispatch(fetchEntradaProductos());
        let cont: number = 0;
        const fechaActual = new Date();

        entradas.payload.forEach((e: any) => {
            const fechaCaducidad = new Date(e.fecha_salida * 1000);
            const diferencia = fechaActual.getTime() - fechaCaducidad.getTime();
            const unMesEnMilisegundos = 30 * 24 * 60 * 60 * 1000;

            if (diferencia > 0 && diferencia < unMesEnMilisegundos) {
                cont++;
            }
        });
        setTotalEntrada(cont);
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                returnProductos(),
                returnCaduca(),
                returnUnMes(),
                returnSalidaUnMes(),
                returnEntradasUnMes(),
            ]);
            setVisible(true);
        };
        fetchData();
    }, []);

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        if (
            totalProductos > 0 ||
            totalCaduca > 0 ||
            totalUnMes > 0 ||
            totalSalida > 0
        ) {
            const data = {
                labels: [
                    "PRODUCTOS",
                    "CADUCA",
                    "CADUCA 1 MES",
                    "SALIDA",
                    "ENTRADA",
                ],
                datasets: [
                    {
                        label: "CANTIDAD",
                        data: [
                            totalProductos,
                            totalCaduca,
                            totalUnMes,
                            totalSalida,
                            totalEntrada,
                        ],
                        backgroundColor: [
                            "rgba(255, 159, 64, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                        ],
                        borderColor: [
                            "rgb(255, 159, 64)",
                            "rgb(75, 192, 192)",
                            "rgb(54, 162, 235)",
                            "rgb(153, 102, 255)",
                            "rgb(153, 102, 255)",
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            const options = {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            };

            setChartData(data);
            setChartOptions(options);
        }
    }, [totalProductos, totalCaduca, totalUnMes, totalSalida]);

    return (
        <div className="card">
            {visible ? (
                <Chart type="bar" data={chartData} options={chartOptions} />
            ) : null}
        </div>
    );
};

export default withAuth(Dashboard);
