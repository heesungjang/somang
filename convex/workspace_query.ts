import { v } from "convex/values";
import { query } from "./_generated/server";

/**
 * @workspaces
 * This query is used to get all workspaces for a user.
 */
export const workspaces = query({
  args: {
    ownerId: v.id("users"),
  },

  handler: async (ctx, args) => {
    const workspaces = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("ownerId"), args.ownerId))
      .collect();

    if (workspaces.length === 0) {
      return null;
    }

    return workspaces;
  },
});

/**
 * @workspace
 * This query is used to get a workspace by its id.
 */
export const workspace = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) {
      return null;
    }
    return workspace;
  },
});

export const workspaceQuickLinks = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const quickLinks = await ctx.db
      .query("workspaceQuickLinks")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .collect();

    if (quickLinks.length === 0) {
      return [];
    }

    return quickLinks;
  },
});
