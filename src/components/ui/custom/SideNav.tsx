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

const NAV_ITEMS = [
  {
    href: "/",
    label: "Dashboard",
    Icon: LayoutDashboard,
    isActive: (p: string) => p === "/" || p === "/dashboard",
  },
  {
    href: "/tickets",
    label: "Tickets",
    Icon: Kanban,
    isActive: (p: string) => p.includes("/tickets"),
  },
  {
    href: "/users",
    label: "Users",
    Icon: Users,
    isActive: (p: string) => p.includes("/users"),
  },
  {
    href: "/projects",
    label: "Projects",
    Icon: FolderKanban,
    isActive: (p: string) => p.includes("/projects"),
  },
];

const ACTIVE_STYLES =
  "bg-[#0144ff0f] text-[rgba(0,37,158,.797)] hover:bg-[#0247f519] dark:bg-[#234fff2e] dark:text-white dark:hover:bg-[#315afe3d]";

const INACTIVE_STYLES =
  "text-zinc-600 hover:bg-[#0247f519] hover:text-[rgba(0,37,158,.797)] dark:text-zinc-500 dark:hover:bg-[#315afe3d] dark:hover:text-[#FAF9F6]";

/**
 * Vertical sidebar. Hidden below `md`, where its 17% basis would collapse to a
 * ~64px column too narrow for the labels; `MobileNav` takes over there.
 */
export function SideNav() {
  const { pathname } = useRouter();

  return (
    <nav className="sticky top-0 hidden h-[100vh] basis-[17%] px-4 py-6 md:block">
      <div className="flex flex-col items-stretch gap-[1px]">
        {NAV_ITEMS.map(({ href, label, Icon, isActive }) => {
          const active = isActive(pathname);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: active ? "secondary" : "ghost" }),
                "justify-start px-6 py-7 text-base",
                active ? ACTIVE_STYLES : INACTIVE_STYLES
              )}
            >
              <span className="flex items-center gap-[10px]">
                <Icon />
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/**
 * Horizontal nav for small screens. Scrolls sideways instead of squashing, and
 * each target is 44px tall to stay comfortably tappable.
 */
export function MobileNav() {
  const { pathname } = useRouter();

  return (
    <nav className="md:hidden">
      <div className="flex gap-1 overflow-x-auto px-3 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV_ITEMS.map(({ href, label, Icon, isActive }) => {
          const active = isActive(pathname);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: active ? "secondary" : "ghost" }),
                "h-11 shrink-0 gap-2 px-3 text-sm",
                active ? ACTIVE_STYLES : INACTIVE_STYLES
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
