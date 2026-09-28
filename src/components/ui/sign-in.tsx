import { Card, Button, Heading, Separator, Text } from "@radix-ui/themes";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { type OAuthStrategy } from "@clerk/shared/types";
import { useSignIn } from "@clerk/nextjs";
const Login = () => {
  const { signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    // `authenticateWithRedirect` was replaced by `sso` in Clerk v7, and the two
    // redirect options were renamed: the old `redirectUrl` (where the provider
    // hands the user back) is now `redirectCallbackUrl`, and the old
    // `redirectUrlComplete` (where the user lands once signed in) is now
    // `redirectUrl`.
    return signIn.sso({
      strategy,
      redirectCallbackUrl: "/tickets",
      redirectUrl: "/",
    });
  };
  return (
    <div className="grid h-screen place-items-center">
      <Card size="2">
        <div className="flex items-start">
          <div className="flex flex-col gap-12 py-8 pb-28">
            <div className="flex flex-row justify-start pl-9">
              <Heading size="7">Sign In</Heading>
            </div>
            <div className="flex items-center justify-center">
              <Button
                style={{ height: "60px", width: "350px" }}
                size="4"
                variant="surface"
                onClick={() => void signInWith("oauth_discord")}
              >
                Sign In as Demo User
              </Button>
            </div>
            <div className="flex items-center justify-stretch gap-3 px-8">
              <Separator style={{ width: "100px" }} size="3" />
              <Text size="2"> OR CONTINUE WITH</Text>
              <Separator style={{ width: "100px" }} size="3" />
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="jusitfy-center flex flex-row items-center gap-2">
                <Button
                  style={{ height: "50px", width: "165px" }}
                  size="4"
                  variant="surface"
                  onClick={() => void signInWith("oauth_discord")}
                >
                  <DiscordLogoIcon />
                  Discord
                </Button>
              </div>
              <div className="jusitfy-center flex flex-row items-center gap-2">
                <Button
                  style={{ height: "50px", width: "165px" }}
                  size="4"
                  variant="surface"
                  onClick={() => void signInWith("oauth_github")}
                >
                  <GitHubLogoIcon />
                  Github
                </Button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="jusitfy-center flex flex-row items-center gap-2">
                <Button
                  style={{ height: "50px", width: "165px" }}
                  size="4"
                  variant="surface"
                  onClick={() => void signInWith("oauth_google")}
                >
                  Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
