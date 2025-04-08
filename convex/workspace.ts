import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const createWorkspace = mutation({
  args: {
    workspaceName: v.string(),
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.workspaceName,
      ownerId: args.ownerId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.insert("workspaceMembers", {
      userId: args.ownerId,
      workspaceId: workspaceId,
      role: "admin",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.patch(args.ownerId, {
      defaultWorkspaceId: workspaceId,
    });

    return workspaceId;
  },
});
