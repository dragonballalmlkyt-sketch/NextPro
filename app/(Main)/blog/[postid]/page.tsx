import { buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CommentSection } from "@/app/components/web/comment";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Presence from "@/app/components/web/postpresece";
import { getToken } from "@/lib/auth-server";


interface PostDetailsProps {
    params: Promise<{ postid: Id<"Posts"> }>;
}

export async function generateMetadata({ params }: PostDetailsProps): Promise<Metadata> {

    const { postid } = await params;
    const Post = await fetchQuery(api.Post.getpostbyid, { postId: postid });
    if (!Post) {
        return {
            title: "Post Not Found",
            description: "The requested post could not be found.",
        };
    }

    return {
        title: Post.title,
        description: Post.body,
    };
}

export default async function PostDetails({ params }: PostDetailsProps) {
    const { postid } = await params;

    const Post = await fetchQuery(api.Post.getpostbyid, { postId: postid });
    // ✅ إضافة await لحل مشكلة userId
    const userId = await fetchQuery(api.presence.getuser, {}, { token: await getToken() });

    if (!Post) {
        return (
            <div className="w-full max-w-3xl mx-auto animate-in relative py-8 px-4 fade-in duration-500 text-left items-start">
                <div className="flex justify-start w-full mb-4">
                    <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
                        <ArrowLeft className="size-4 mr-2" />
                        Go back
                    </Link>
                </div>
                <p className="text-lg text-muted-foreground">Post not found.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto animate-in relative py-8 px-4 fade-in duration-500 text-left items-start">
            {/* المحاذاة بين الزر ومكون التواجد */}
            <div className="flex items-center justify-between w-full mb-4 gap-4">
                <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
                    <ArrowLeft className="size-4 mr-2" />
                    Go back
                </Link>
                
                
            </div>

            <div className="relative w-full overflow-hidden rounded-xl h-[200px] xs:h-[250px] sm:h-[420px] bg-muted shadow-md border border-border/50 group">
                <Image
                    src={
                        Post.imageUrl ??
                        "https://www.chitkara.edu.in/blogs/wp-content/uploads/2023/09/Blogging-in-Digital-Marketing.jpg"
                    }
                    alt={Post.title || "Blog Post Image"}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 768px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>

            <div className="mt-6 flex flex-col gap-4">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    {Post.title}
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground">
                    Posted on: {new Date(Post._creationTime || "not available").toLocaleDateString()}
                </p>


                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {Post.body}
                </p>
                <div className="text-black">
                {userId && <Presence roomId={postid} userId={userId._id} />}
                </div>
                
                <hr className="my-6 border-t-2 border-border opacity-80" />

                

                <CommentSection userId={userId?._id ?? ""} />
            </div>
        </div>
    );
}