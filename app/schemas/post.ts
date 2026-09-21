import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(2, { message: "The title must be at least 2 characters." }),
    content: z.string().min(10, { message: "The content must be at least 10 characters." }),
    image: z.instanceof(File)
    });