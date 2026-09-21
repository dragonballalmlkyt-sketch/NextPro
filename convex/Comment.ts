import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server"
import { authComponent } from "./betterAuth/auth";


export const createComment = mutation({
    args: {
        postId: v.id("Posts"),
        body: v.string(),
    },

    handler: async (ctx, args) => {

        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
        throw new ConvexError("User not authenticated");
        }

        return await ctx.db.insert("Comments", {
            postId: args.postId,
            authorId: user._id,
            authorName: user.name,
            body: args.body,
        }
        )
    }

})


export const getComment = query({
    args: {
        postId: v.id("Posts"),
    },
    handler: async (ctx, args) => {
        const data = await ctx.db.query("Comments").filter((q) => q.eq(q.field("postId"), args.postId)).order("desc").collect();

        return data;
    }
})

