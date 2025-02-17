import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import axios from "axios";
// axios.baseURL = "https://suvidya-chemtech-quiz.vercel.app";
axios.baseURL = process.env.baseURL || "http://localhost:3000";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Suvidya's Chemtech Quiz",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      <body className={inter.className + " bg-yellow-300"}>
        <main className="h-screen w-screen p-3">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
