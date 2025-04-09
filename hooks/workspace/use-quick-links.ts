import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface IUseQuickLinks {
  workspaceId: Id<"workspaces"> | null | undefined;
}

const useQuickLinks = ({ workspaceId }: IUseQuickLinks) => {
  const quickLinks = useQuery(
    api.workspace_query.workspaceQuickLinks,
    workspaceId ? { workspaceId } : "skip",
  );

  return quickLinks || null;
};

export default useQuickLinks;
