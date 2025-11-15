import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bloodflow",
  description:
    "Bloodflow es una plataforma que conecta donantes de sangre con hospitales y bancos de sangre. Dona sangre, salva vidas. Únete a nuestra comunidad.",
  keywords:
    "donación de sangre, banco de sangre, donantes, salud, emergencias médicas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
