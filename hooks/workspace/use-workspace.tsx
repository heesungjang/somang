import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface IUseWorkspace {
  workspaceId: Id<"workspaces"> | null | undefined;
}

const useWorkspace = ({ workspaceId }: IUseWorkspace) => {
  const workspace = useQuery(
    api.workspace.workspace,
    workspaceId ? { workspaceId } : "skip",
  );

  return workspace || null;
};

export default useWorkspace;
