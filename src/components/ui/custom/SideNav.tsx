import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/router";
import { LayoutDashboard, Users, Kanban, FolderKanban } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

//button colors
//dark bg: #234fff2e
//hover dark: #315afe3d
//light bg: #0144ff0f
//light hover: #0247f519

export function SideNav() {
  const { pathname } = useRouter();

  return (
    <nav className="sticky top-0 h-[100vh] basis-[17%] px-4 py-6">
      <div className="flex flex-col items-stretch gap-[1px]">
        {/* Dashboard */}
        {pathname === "/" || pathname === "/dashboard" ? (
          <Link
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "justify-start bg-[#0144ff0f] px-6 py-7 text-base text-[rgba(0,37,158,.797)] hover:bg-[#0247f519] dark:bg-[#234fff2e] dark:text-white dark:hover:bg-[#315afe3d]"
            )}
            href="/"
          >
            <div className="flex items-center gap-[10px]">
              <LayoutDashboard />
              Dashboard
            </div>
          </Link>
        ) : (
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start px-6 py-7 text-base text-zinc-600 hover:bg-[#0247f519] hover:text-[rgba(0,37,158,.797)] dark:text-zinc-500 dark:hover:bg-[#315afe3d] dark:hover:text-[#FAF9F6]"
            )}
            href="/"
          >
            <div className="flex items-center gap-[10px]">
              <LayoutDashboard />
              Dashboard
            </div>
          </Link>
        )}

        {/* Tickets */}
        {pathname.includes("/tickets") ? (
          <Link
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "justify-start bg-[#0144ff0f] px-6 py-7 text-base text-[rgba(0,37,158,.797)] hover:bg-[#0247f519] dark:bg-[#234fff2e] dark:text-white dark:hover:bg-[#315afe3d]"
            )}
            href="/tickets"
          >
            <div className="flex items-center gap-[10px]">
              <Kanban />
              Tickets
            </div>
          </Link>
        ) : (
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start px-6 py-7 text-base text-zinc-600 hover:bg-[#0247f519] hover:text-[rgba(0,37,158,.797)] dark:text-zinc-500 dark:hover:bg-[#315afe3d] dark:hover:text-[#FAF9F6]"
            )}
            href="/tickets"
          >
            <div className="flex items-center gap-[10px]">
              <Kanban />
              Tickets
            </div>
          </Link>
        )}

        {/* Users */}
        {pathname.includes("/users") ? (
          <Link
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "justify-start bg-[#0144ff0f] px-6 py-7 text-base text-[rgba(0,37,158,.797)] hover:bg-[#0247f519] dark:bg-[#234fff2e] dark:text-white dark:hover:bg-[#315afe3d]"
            )}
            href="/users"
          >
            <div className="flex items-center gap-[10px]">
              <Users />
              Users
            </div>
          </Link>
        ) : (
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start px-6 py-7 text-base text-zinc-600 hover:bg-[#0247f519] hover:text-[rgba(0,37,158,.797)] dark:text-zinc-500 dark:hover:bg-[#315afe3d] dark:hover:text-[#FAF9F6]"
            )}
            href="/users"
          >
            <div className="flex items-center gap-[10px]">
              <Users />
              Users
            </div>
          </Link>
        )}
        {/* Users */}
        {pathname.includes("/projects") ? (
          <Link
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "justify-start bg-[#0144ff0f] px-6 py-7 text-base text-[rgba(0,37,158,.797)] hover:bg-[#0247f519] dark:bg-[#234fff2e] dark:text-white dark:hover:bg-[#315afe3d]"
            )}
            href="/projects"
          >
            <div className="flex items-center gap-[10px]">
              <FolderKanban />
              Projects
            </div>
          </Link>
        ) : (
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start px-6 py-7 text-base text-zinc-600 hover:bg-[#0247f519] hover:text-[rgba(0,37,158,.797)] dark:text-zinc-500 dark:hover:bg-[#315afe3d] dark:hover:text-[#FAF9F6]"
            )}
            href="/projects"
          >
            <div className="flex items-center gap-[10px]">
              <FolderKanban />
              Projects
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
