import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
export const metadata: Metadata = { title: "Giriş yap", robots: { index: false } };
export default function Giris() {
  return <Suspense><LoginForm /></Suspense>;
}
