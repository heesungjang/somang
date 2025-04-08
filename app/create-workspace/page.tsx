"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import useViewer from "@/hooks/user/use-viewer";
import StickyHeader from "@/components/ui/sticky-header";

const CreateWorkspacePage = () => {
  const router = useRouter();
  const viewer = useViewer();
  const createWorkspace = useMutation(api.workspace.createWorkspace);

  const [workspaceName, setWorkspaceName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName) {
      return;
    }
    if (!viewer) {
      return;
    }

    const workspaceId = await createWorkspace({
      workspaceName: workspaceName,
      ownerId: viewer._id,
    });

    router.push(`/workspace/${workspaceId}`);
  };

  return (
    <div className="min-h-screen px-4 md:ml-42 md:mt-16 text-white">
      <StickyHeader />

      <div className="max-w-3xl  mx-auto px-4 pt-32">
        <h1 className="text-2xl font-bold mb-8">새로운 워크스페이스 생성</h1>

        <form onSubmit={handleSubmit} className="space-y-10 min-w-sm">
          <div className="space-y-2">
            <Label htmlFor="workspace-name" className="block text-sm mb-1">
              워크스페이스 이름 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="workspace-name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="교회 또는 단체의 기존 이름이 가장 좋습니다."
              className="w-full bg-[#1e1e1e] border-gray-700"
              required
            />
          </div>

          <div className="pt-4 flex gap-4">
            <Button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600"
            >
              작업 공간 생성
            </Button>
            <Button
              type="button"
              variant="outline"
              className="px-6 py-2 bg-transparent border-gray-700 hover:bg-gray-800"
              onClick={() => window.history.back()}
            >
              뒤로 가기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkspacePage;
