import "./globals.css";
import StoreProvider from "../store/StoreProvider";

export const metadata = {
    title: "Weather Dashboard",
    description: "Real-time weather application built with Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning className="h-full">
            <body className="h-full p-10 bg-zinc-300/10 overflow-hidden">
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
