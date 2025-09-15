"use client";
import { useState, useEffect } from "react";
import {Search, Sun, Moon} from "lucide-react";
export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    useEffect(() => {
        if (!("theme" in localStorage)) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            setIsDarkMode(true);
        }
        else if (localStorage.theme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        }
        else {
            document.documentElement.classList.remove("dark");
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
        <header className="relative bg-gray-600 dark:bg-gray-900 text-white p-4 flex items-center justify-between">
            <div className="absolute left-1/2 -translate-x-[25%] flex items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Movie Catalog</h1>
                <div className="relative w-[50%]">
                    <Search className="absolute left-1.5 top-1/2 -translate-y-1/2 scale-75 text-gray-500" />
                    <input
                        className="border-2 border-gray-500 rounded-sm w-full placeholder:italic h-[28px] pl-8 focus:outline-none focus:border-sky-600 transition-colors duration-300"
                        placeholder="Find your movie"
                    />
                </div>
            </div>
            <button className="ml-auto w-8 h-8 bg-white hover:bg-gray-500 dark:bg-black dark:hover:bg-gray-800 cursor-pointer active:scale-90 rounded-full transition-all duration-300" onClick={toggleDarkMode}>
                {isDarkMode ? <Moon className="pl-2 scale-120" />: <Sun className="pl-1.5 text-black scale-120" />}
            </button>
        </header>
    );
}