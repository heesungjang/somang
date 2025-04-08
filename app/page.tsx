"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useViewer from "@/hooks/user/use-viewer";

import useWorkspaces from "@/hooks/workspace/use-workspaces";
import LoaderSpinCenter from "@/components/ui/loader-spin-center";

export default function RootRouter() {
  const router = useRouter();
  const viewer = useViewer();
  const workspaces = useWorkspaces({
    userId: viewer?._id,
  });

  useEffect(() => {
    if (viewer) {
      if (workspaces?.length === 0) {
        router.push("/create-workspace");
      } else if (viewer.defaultWorkspaceId) {
        router.push(`/workspace/${viewer.defaultWorkspaceId}`);
      }
    }
  }, [viewer, workspaces, router]);

  return <LoaderSpinCenter />;
}
