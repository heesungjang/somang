import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const AppBreadcrumb = () => {
  const pathname = usePathname();

  const breadcrumbPaths = useMemo(() => {
    if (!pathname) return [];

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length < 2 || segments[0] !== "workspace") {
      return [];
    }

    const workspaceId = segments[1];
    const paths = [
      {
        name: "Home",
        href: `/workspace/${workspaceId}`,
      },
    ];

    if (segments.length > 2) {
      paths.push({
        name: segments[2] || "",
        href: `/workspace/${workspaceId}/${segments[2]}`,
      });

      for (let i = 3; i < segments.length; i++) {
        const href = `/workspace/${workspaceId}/${segments.slice(2, i + 1).join("/")}`;
        paths.push({
          name: segments[i] || "",
          href,
        });
      }
    }

    return paths;
  }, [pathname]);

  if (breadcrumbPaths.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbPaths.map((path, index) => (
          <BreadcrumbItem key={path.href}>
            <Link href={path.href}>{path.name}</Link>
            {index < breadcrumbPaths.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

AppBreadcrumb.displayName = "AppBreadcrumb";

export { AppBreadcrumb };
