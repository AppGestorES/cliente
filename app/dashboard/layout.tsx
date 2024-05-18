"use client";

import DashboardProvider from "../Components/DashboardProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardProvider>{children}</DashboardProvider>;
}
