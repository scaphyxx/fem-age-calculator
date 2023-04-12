import Image from "next/image";
import { Inter } from "next/font/google";
import Card from "@/components/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="absolute inset-0 flex min-h-screen items-center justify-center bg-light-gray p-2 md:p-8">
      <Card />
    </main>
  );
}
