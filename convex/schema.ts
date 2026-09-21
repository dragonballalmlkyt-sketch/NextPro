import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema ({
    Posts: defineTable({
        title: v.string(),
        body: v.string(),
        autherid: v.string(),
        ImagestorageId: v.optional(v.id("_storage"))
    }).searchIndex("search_title",{
        searchField: "title",
    }).searchIndex("search_body",{
        searchField: "body",
    }),

    Comments: defineTable({
        postId: v.id("Posts"),
        authorId: v.string(),
        authorName: v.string(),
        body: v.string(),
    }),

})