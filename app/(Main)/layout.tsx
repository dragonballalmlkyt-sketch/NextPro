import Navbar from "../components/web/navbar";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Add Post',
    description: 'Create a new post for your blog and share your thoughts with the world.',
}
export default function Mainlayout({ children }: { children: React.ReactNode }) {
  return (

    <>
    <Navbar />
    {children}
    </>

  );
}
    