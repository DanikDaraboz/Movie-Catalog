"use client";
import { useState, useEffect } from "react";
export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    useEffect(() => {
        if (localStorage.theme === "light " || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
            setIsDarkMode(true);
        }
        else{
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
            setIsDarkMode(false);
        }
    }, []);
    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            setIsDarkMode(true);
        }
    };
    return (
        <header className="relative bg-gray-900 text-white p-4 flex items-center justify-between">
            <div className="absolute left-1/2 -translate-x-[25%] flex items-center gap-4">
                <h1 className="text-2xl font-bold">Movie Catalog</h1>
                <input className="border-2 rounded-lg w-[50%]" placeholder="Find your movie"></input>
            </div>
            <button className="ml-auto w-8 h-8 bg-blue-500 rounded-full" onClick={toggleDarkMode}>
                {isDarkMode ? "🌙" : "☀️"}
            </button>
        </header>
    );
}