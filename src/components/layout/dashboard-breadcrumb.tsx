"use client";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { usePathname } from "next/navigation";

const segmentLabels: Record<string, string> = {
  dashboard: "Dashboard",
  mahasiswa: "Mahasiswa",
  tambah: "Tambah Mahasiswa",
  edit: "Edit Mahasiswa",
  profile: "Profil Saya",
};

function formatSegmentLabel(
  segment: string,
  index: number,
  segments: string[],
): string {
  if (segmentLabels[segment]) {
    return segmentLabels[segment];
  }

  if (/^\d+$/.test(segment)) {
    const nextSegment = segments[index + 1];
    return nextSegment === "edit" ? "Detail Mahasiswa" : "Detail";
  }

  return decodeURIComponent(segment)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) {
    return null;
  }

  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label = formatSegmentLabel(segment, index, segments);
    const isLast = index === segments.length - 1;

    return {
      href,
      label,
      isLast,
    };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden xl:block border-b border-sidebar-border bg-white/90 px-6 py-4 backdrop-blur"
    >
      <ol className="flex items-center gap-1 text-sm text-muted-foreground">
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1">
            {crumb.isLast ? (
              <span className="font-medium text-foreground">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="rounded-md px-2 py-1 transition-colors hover:bg-sidebar-accent hover:text-foreground"
              >
                {crumb.label}
              </Link>
            )}
            {!crumb.isLast && (
              <ChevronRightIcon sx={{ fontSize: 18 }} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
