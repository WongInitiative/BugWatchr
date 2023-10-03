import { Button, Text } from "@radix-ui/themes";
import { DarkModeToggle } from "@/components/ui/custom/DarkModeToggle";
import { Bug } from "lucide-react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export function MainNav() {
  const user = useUser();

  return (
    <div className="flex justify-center px-[20px] py-[15px]">
      <div className="w-full px-0">
        <div className="flex w-full items-center justify-between space-x-4 lg:space-x-6">
          {/* primary nav */}
          <div className="flex space-x-4 lg:space-x-6">
            <Link className="flex items-center gap-[2px]" href="/">
              <Bug className="h-8 w-8" />
              <Text as="span" size="4" weight="medium">
                BugWatch
              </Text>
            </Link>
          </div>

          {/* secondary nav */}
          <div className="flex items-center space-x-2">
            {user.isSignedIn ? (
              <SignOutButton>
                <Button variant="surface">Sign Out</Button>
              </SignOutButton>
            ) : (
              <SignInButton>
                <Button variant="surface">Sign In</Button>
              </SignInButton>
            )}
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
