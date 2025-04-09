import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    defaultWorkspaceId: v.optional(v.id("workspaces")),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),

  numbers: defineTable({
    value: v.number(),
  }),

  workspaces: defineTable({
    name: v.string(),
    ownerId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_owner", ["ownerId"]),

  workspaceMembers: defineTable({
    userId: v.id("users"),
    workspaceId: v.id("workspaces"),
    role: v.union(v.literal("admin"), v.literal("member")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  workspaceQuickLinks: defineTable({
    name: v.string(),
    url: v.string(),
    workspaceId: v.id("workspaces"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  workspaceSchedules: defineTable({
    name: v.string(),
    description: v.string(),
    workspaceId: v.id("workspaces"),
    createdAt: v.number(),
    updatedAt: v.number(),
    startDate: v.number(),
    startTime: v.number(),
    endDate: v.number(),
    endTime: v.number(),
  }).index("by_workspace", ["workspaceId"]),
});
