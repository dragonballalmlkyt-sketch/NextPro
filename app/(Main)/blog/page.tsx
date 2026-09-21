import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import type { Metadata } from 'next'



export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read the latest posts, insights, and stories from our authors on our blog page.',
}



export default async function BlogPage() {
    

    return (
        <main className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden">
        {/* قسم العنوان والوصف */}
        <section className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Welcome to Our Blog
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Here you can find the latest posts, insights, and stories from our authors.
            </p>
        </section>

        <Suspense fallback={skeletonLoader()}>
            <LoadPosts />
        </Suspense>
        </main>
    );
}

async function LoadPosts() {

    const Posts = await fetchQuery(api.Post.getposts);

    return (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Posts?.map((post) => (
            <Card
                key={post._id}
                className="overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group p-0"
            >
                <div>
                {/* حاوية الصورة */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
                    <Image
                    src={
                    post.imageUrl ?? "https://www.chitkara.edu.in/blogs/wp-content/uploads/2023/09/Blogging-in-Digital-Marketing.jpg"
                    }
                    alt={post.title || "Blog Post Image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                </div>

                {/* محتوى البطاقة */}
                <CardContent className="p-5">
                    <p className="block text-xl font-semibold tracking-tight text-foreground hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {post.body}
                    </p>
                </CardContent>
                </div>

                {/* زر مدمج بالكامل في أسفل البطاقة بدون حواشي خروج */}
                <Link
                href={`/blog/${post._id}`}
                className={buttonVariants({
                    variant: "default",
                    className:
                    "w-full rounded-none h-11 text-center justify-center font-medium transition-colors bg-purple-600 hover:bg-purple-700 text-white mt-4",
                })}
                >
                Read More
                </Link>
            </Card>
            ))}

        </div>
    )}


function skeletonLoader() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(5)].map((_, index) => (
                <div
                key={index}
                className="flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card shadow-sm"
                >
                {/* صورة المقال بنفس نسبة الأبعاد */}
                <Skeleton className="w-full aspect-[16/9] rounded-none" />

                {/* محتوى النصوص */}
                <div className="flex flex-col space-y-3 p-5">
                    {/* عنوان المقال */}
                    <Skeleton className="h-6 w-3/4 rounded-md" />
                    
                    {/* تفاصيل الوصف */}
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-2/3 rounded-md" />
                    </div>
                </div>

                {/* زر قراءة المزيد */}
                <Skeleton className="h-11 w-full rounded-none mt-auto" />
                </div>
            ))}
            </div>
    );
}
