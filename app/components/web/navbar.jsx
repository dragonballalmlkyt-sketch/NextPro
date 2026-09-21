"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Searchcom } from "./search";

export default function Navbar() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <header className="w-full bg-background border-b sticky top-0 z-40">
            {/* الصف الرئيسي (العلوي) */}
            <nav className="w-full h-16 text-foreground flex items-center justify-between px-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Next<span className="text-blue-500">PRO</span>
                        </h1>
                    </Link>

                    {/* أزرار التنقل للشاشات المتوسطة والكبيرة */}
                    <div className="hidden md:flex gap-4 items-center font-bold">
                        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
                            Home
                        </Link>
                        <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
                            Blog
                        </Link>
                        <Link href="/create" className={buttonVariants({ variant: "ghost" })}>
                            Create
                        </Link>
                    </div>

                    {/* قائمة Select للهواتف فقط */}
                    <div className="md:hidden w-28">
                        <Select onValueChange={(value) => router.push(value)}>
                            <SelectTrigger className="h-9 text-xs">
                                <SelectValue placeholder="Menu" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="/">Home</SelectItem>
                                <SelectItem value="/blog">Blog</SelectItem>
                                <SelectItem value="/create">Create</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                
                {/* أزرار التحكم والـ Auth */}
                <div className="flex gap-2 items-center">
                    <div className="hidden md:block flex-1 max-w-xs mx-4">
                        <Searchcom />
                    </div>

                    {isLoading ? (
                        <span className="text-xs text-muted-foreground">Loading...</span>
                    ) : isAuthenticated ? (
                        <Button
                            onClick={() =>
                                authClient.signOut({
                                    fetchOptions: {
                                        onSuccess: () => {
                                            toast.success("Logged out successfully!");
                                            router.push("/");
                                        },
                                        onError: (error) => {
                                            toast.error(`Error logging out: ${error.error.Message}`);
                                        },
                                    },
                                })
                            }
                            className={buttonVariants({ variant: "default", size: "sm" })}
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Link href="/login" className={buttonVariants({ variant: "default", size: "sm" })}>
                                Login
                            </Link>
                            <Link href="/signup" className={buttonVariants({ variant: "secondary", size: "sm" })}>
                                Sign Up
                            </Link>
                        </>
                    )}
                    <ModeToggle />
                </div>
            </nav>

            {/* صف البحث السفلي - يظهر فقط في الهواتف والشاشات الصغيرة */}
            <div className="block md:hidden border-t py-2 px-4 bg-muted/20">
                <div className="w-full flex justify-center items-center">
                    <Searchcom />
                </div>
            </div>
        </header>
    );
}