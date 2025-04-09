import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface IUseWorkspaces {
  userId: Id<"users"> | null | undefined;
}

const useWorkspaces = ({ userId }: IUseWorkspaces) => {
  const workspaces = useQuery(
    api.workspace_query.workspaces,
    userId ? { ownerId: userId } : "skip",
  );

  return workspaces || null;
};

export default useWorkspaces;
