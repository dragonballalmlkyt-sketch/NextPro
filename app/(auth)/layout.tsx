import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {ReactNode} from "react";
import { buttonVariants } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Welcome ',
    description: 'welcome to our authentication page! Sign up or log in to access your personalized content and features. Join our community and start your journey with us today.',
}
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start lg:justify-center bg-background p-4 pt-20 md:p-8 md:pt-28 relative">
      <div className="absolute top-4 left-4">
        <Link href="/" className={buttonVariants({variant: "default", size: "sm"})}>
            <ArrowLeft className="h-6 w-6 text-muted-foreground" />
            Go back
        </Link>

      </div>
      <div className="max-w-md w-full mx-auto ">
        {children}
      </div>
    </div>
  );
}