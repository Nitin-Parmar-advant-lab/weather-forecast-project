import "./globals.css";
import StoreProvider from "../store/StoreProvider";

export const metadata = {
    title: "Weather Dashboard",
    description: "Real-time weather application built with Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning className="h-full">
            <body className="min-h-screen lg:h-full p-2 sm:p-6 lg:p-10 bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-x-hidden overflow-y-auto lg:overflow-hidden antialiased text-slate-200">
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
