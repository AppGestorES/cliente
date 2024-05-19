import DashboardProvider from "@/app/Components/DashboardProvider";

export default function DashboardLayoutWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DashboardProvider>{children}</DashboardProvider>;
}
