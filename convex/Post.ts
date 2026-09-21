import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";
import { Doc } from "./_generated/dataModel";
import { id } from "zod/v4/locales";

export const createPost = mutation({
    args: { title: v.string(), content: v.string(),ImagestorageId: v.id("_storage") },


    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
        throw new ConvexError("User not authenticated");
        }
        
        const blog = await ctx.db.insert("Posts", {
        title: args.title,
        body: args.content,
        autherid: user._id,
        ImagestorageId: args.ImagestorageId
        });

        return blog;
    },
    
});

export const getposts = query({
    args: {},
    handler: async (ctx) => {
        const posts = await ctx.db.query("Posts").order("desc").collect();
        return await Promise.all(posts.map(async (post) => {
            const resolveimageuel = post.ImagestorageId !== undefined ? await ctx.storage.getUrl(post.ImagestorageId) : null;
            return {
                ...post,
                imageUrl: resolveimageuel
            }
        }));
    }
})


export const imageid = mutation({
    args: {},
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
        throw new ConvexError("User not authenticated");
        }

        return await ctx.storage.generateUploadUrl();
    }
})

export const getpostbyid = query({
    args: { postId: v.id("Posts") },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);

        const resolveimageuel = post?.ImagestorageId !== undefined ? await ctx.storage.getUrl(post.ImagestorageId) : null;

        return {
            ...post,
            imageUrl: resolveimageuel
        };
    }
})

interface SearchResult {
    _id: string;
    title: string;
    body: string;
}

export const searchPost = query({
    args: {
        searchTerm: v.string(),
        limit: v.number()
    },

    handler: async (ctx, args) => {
        const limit = args.limit;

        const result: Array<SearchResult> = [];

        const seen = new Set();

        const pushDocs = async (docs: Array<Doc<"Posts">>) => {
            for (const doc of docs){
                if (seen.has(doc._id)) continue;

                seen.add(doc._id);
                result.push({
                    _id: doc._id,
                    title: doc.title,
                    body: doc.body,
                });
                if (result.length >= limit) break;
            }
        }
        const titleMatch = await ctx.db.query("Posts").withSearchIndex("search_title",(q) => q.search('title', args.searchTerm)).take(limit);
        await pushDocs(titleMatch);

        if (result.length < limit) {
            const bodyMatch = await ctx.db.query("Posts").withSearchIndex("search_body", (q) => q.search('body', args.searchTerm)).take(limit);
            await pushDocs(bodyMatch);
        }

        return result;
    }
})








