"use client";

import { commentSchema } from "@/app/schemas/comment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { redirect, useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { connection } from "next/server";


interface user{
    userId: string;
}
type CommentFormValues = z.infer<typeof commentSchema>;

export function CommentSection({ userId }: user) {
    const params = useParams<{ postid: Id<"Posts"> }>();
    const postId = params.postid;

    const createCommentSchema = useMutation(api.Comment.createComment);
    const comments = useQuery(api.Comment.getComment, { postId: postId });

    const [isPending, startTransition] = useTransition();

    const form = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            postId: postId,
            body: "",
        },
    });

    function onSubmit(data: CommentFormValues) {
        if(!userId){
            toast.error("You must be logged in to post a comment.");
            redirect("/login");
            return;
        }
        startTransition(async () => {
            try {
                await createCommentSchema(data);
                form.reset();
                toast.success("Comment posted successfully!");
            } catch (error) {
                toast.error("Failed to post comment");
            }
        });
    }


    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold tracking-tight">
                    {comments ? `${comments.length} Comment${comments.length === 1 ? "" : "s"}` : "Comments"}
                </h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        name="body"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field className="space-y-2">
                                <FieldLabel className="text-sm font-medium">Add a comment</FieldLabel>
                                <Textarea 
                                    placeholder="Write your comment here..." 
                                    className="min-h-[90px] resize-y"
                                    {...field} 
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.error && (
                                    <p className="text-xs text-destructive mt-1">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </Field>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending} size="sm">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Post Comment
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                {/* قائمة التعليقات / أو الهيكل المؤقت Skeleton */}
                <section className="space-y-4">
                    {comments === undefined ? (
                        <CommentSkeletonLoader />
                    ) : comments.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No comments yet. Be the first to comment!
                        </p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment._id} className="border-b border-border/50 pb-4 flex">
                                <Avatar className="size-10 shrink-0 mr-4">
                                    <AvatarImage src={`https://avatar.vercel.sh/${comment.authorName}?rounded=60`} alt="User Avatar" />
                                    <AvatarFallback>{comment.authorName?.slice(0, 2).toUpperCase() || "US"}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">{comment.authorName}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(comment._creationTime).toLocaleDateString()}</p>
                                    </div>

                                    <div className="text-sm text-muted-foreground">
                                        {comment.body}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </CardContent>
        </Card>
    );
}

// Skeleton مخصص لـ 3 تعليقات ومناسب لشكل التعليق
function CommentSkeletonLoader() {
    
    return (
        <div className="space-y-4 w-full">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b border-border/40">
                    {/* الصورة الرمزية */}
                    <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                    
                    <div className="flex-1 space-y-2">
                        {/* الاسم والتاريخ */}
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-28 rounded" />
                            <Skeleton className="h-3 w-16 rounded" />
                        </div>
                        {/* نص التعليق */}
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-3/4 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}