import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "../store/StoreProvider";

export const metadata = {
    title: "Weather Dashboard",
    description: "Real-time weather application built with Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="h-full mx-20 my-10">
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
