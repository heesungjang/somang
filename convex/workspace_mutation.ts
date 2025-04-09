import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * @createWorkspace
 * This mutation is used to create a new workspace.
 */
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

/**
 * @createQuickLink
 * This mutation is used to create a new shortcut.
 */
export const createQuickLink = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    url: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if a quick link with the same URL already exists
    const existingQuickLinks = await ctx.db
      .query("workspaceQuickLinks")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), args.workspaceId),
          q.eq(q.field("url"), args.url),
        ),
      )
      .collect();

    // If a quick link with the same URL exists, don't create a new one
    if (existingQuickLinks.length > 0) {
      throw new ConvexError({
        code: "quick_link_already_exists",
        message: "이미 존재하는 링크입니다.",
      });
    }

    const quickLinkId = await ctx.db.insert("workspaceQuickLinks", {
      workspaceId: args.workspaceId,
      url: args.url,
      name: args.name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return quickLinkId;
  },
});

/**
 * @deleteQuickLink
 * This mutation is used to delete a quick link.
 */
export const deleteQuickLink = mutation({
  args: {
    quickLinkId: v.id("workspaceQuickLinks"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.quickLinkId);
  },
});

/**
 * @updateQuickLink
 * This mutation is used to update an existing quick link.
 */
export const updateQuickLink = mutation({
  args: {
    quickLinkId: v.id("workspaceQuickLinks"),
    url: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const quickLink = await ctx.db.get(args.quickLinkId);

    if (!quickLink) {
      throw new ConvexError({
        code: "quick_link_not_found",
        message: "바로가기 링크를 찾을 수 없습니다.",
      });
    }

    await ctx.db.patch(args.quickLinkId, {
      url: args.url,
      name: args.name,
      updatedAt: Date.now(),
    });

    return args.quickLinkId;
  },
});
