"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { postSchema } from "@/app/schemas/post";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";



export default function CreatePage() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    

    const user = useQuery(api.presence.getuser);
    // 1. تعريف الـ Mutations بشكل صحيح في أعلى المكون
    const createPost = useMutation(api.Post.createPost);
    const generateUploadUrl = useMutation(api.Post.imageid);

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
            image: undefined,
        },
    });

    function handleSubmit(data: z.infer<typeof postSchema>) {
        startTransition(async () => {
            try {
                let storageId: Id<"_storage"> | undefined = undefined;
                
                const userId = user?._id;
                if (!userId) {
                    toast.error("You must be logged in to create a post.");
                    router.push("/login");
                    return;
                }

                if (data.image) {
                    // 2. استدعاء دالة جلب الرابط مباشرة
                    const uploadUrl = await generateUploadUrl();

                    // 3. تغيير method إلى POST
                    const result = await fetch(uploadUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": data.image.type,
                        },
                        body: data.image,
                    });

                    if (!result.ok) {
                        throw new Error("Failed to upload image");
                    }

                    const { storageId: uploadedStorageId } = await result.json();
                    storageId = uploadedStorageId as Id<"_storage">;
                }

                // 4. استدعاء دالة إنشاء المقال مع المطابقة الصحيحة للأنواع
                await createPost({
                    title: data.title,
                    content: data.content,
                    ImagestorageId: storageId as Id<"_storage">,
                });

                toast.success("Post created successfully!");
                router.push("/");
            } catch (error) {
                toast.error("Failed to create post");
            }
        });
    }

    return (
        <div className="min-h-screen w-full overflow-x-hidden flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background box-border">
            <Card className="w-full max-w-[calc(100vw-2rem)] sm:max-w-md md:max-w-xl lg:max-w-2xl shadow-lg mx-auto border border-border">
                <CardHeader className="text-center space-y-2 p-4 sm:p-6 md:p-8 pb-2 sm:pb-4 md:pb-4">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                        Add Post
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base">
                        Write a new post for your audience.
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-4 sm:p-6 md:p-8 pt-2 sm:pt-4 md:pt-4">
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 md:space-y-6">
                        <FieldGroup className="space-y-4 md:space-y-5">
                            
                            {/* Title Field */}
                            <Controller
                                control={form.control}
                                name="title"
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel className="text-sm md:text-base">Title</FieldLabel>
                                        <Input 
                                            placeholder="Title..." 
                                            {...field} 
                                            aria-invalid={fieldState.invalid} 
                                            className="w-full h-10 md:h-11 text-sm md:text-base"
                                        />
                                        {fieldState.error && (
                                            <p className="text-xs md:text-sm text-destructive mt-1">
                                                {fieldState.error.message}
                                            </p>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Content Field */}
                            <Controller
                                control={form.control}
                                name="content"
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel className="text-sm md:text-base">Content</FieldLabel>
                                        <Textarea
                                            placeholder="Content..."
                                            className="min-h-[120px] md:min-h-[160px] resize-y w-full text-sm md:text-base"
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.error && (
                                            <p className="text-xs md:text-sm text-destructive mt-1">
                                                {fieldState.error.message}
                                            </p>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Image Field */}
                            <Controller
                                control={form.control}
                                name="image"
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel className="text-sm md:text-base">Image</FieldLabel>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="w-full h-10 md:h-11 text-sm md:text-base"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file);
                                            }}  
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.error && (
                                            <p className="text-xs md:text-sm text-destructive mt-1">
                                                {fieldState.error.message}
                                            </p>
                                        )}
                                    </Field>
                                )}
                            />

                        </FieldGroup>

                        <Button disabled={isPending} type="submit" className="w-full h-10 md:h-11 text-sm md:text-base font-medium">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Add Post"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}