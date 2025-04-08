import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-side-bar";
import { AppContentWrapper } from "@/components/app-content-wrapper/wrapper";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen w-full">
      <main className="relative flex h-full w-full">
        <AppSidebar />
        <AppContentWrapper>{children}</AppContentWrapper>
      </main>
    </div>
  );
}
