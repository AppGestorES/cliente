"use client";

import { Button } from "primereact/button";
import { useState, useEffect, use } from "react";

export default function ToggleTheme() {
    const [theme, setTheme] = useState(
        typeof window !== "undefined"
            ? localStorage.getItem("theme") || "viva-dark"
            : "viva-light"
    );

    const toggleTheme = () => {
        const newTheme = theme === "viva-dark" ? "viva-light" : "viva-dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        import(`@/app/utils/themes/${theme}/theme.css`)
            .then(() => {
                const link = document.createElement("link");
                link.href = `/themes/${theme}/theme.css`;
                link.type = "text/css";
                link.rel = "stylesheet";
                link.id = "theme-style";

                document.head.appendChild(link);

                return () => {
                    const existingLink = document.getElementById("theme-style");
                    if (existingLink) {
                        document.head.removeChild(existingLink);
                    }
                };
            })
            .catch((err) => console.error("Error loading the theme:", err));
    }, [theme]);
    const icon = theme === "viva-dark" ? "pi pi-sun" : "pi pi-moon";

    return <Button icon={icon} onClick={toggleTheme} />;
}
