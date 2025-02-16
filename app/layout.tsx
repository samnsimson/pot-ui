import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { DrawerProvider } from "@/context/drawer-context";

const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["200", "400", "700"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["400", "700", "800"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${poppins.className} ${montserrat.className} antialiased`}>
                <DrawerProvider>{children}</DrawerProvider>
            </body>
        </html>
    );
}
