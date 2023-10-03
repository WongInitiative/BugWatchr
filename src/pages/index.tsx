import { type NextPage } from "next";
import TopRowAnalytics from "@/components/ui/custom/analytics/TopRowAnalytics";
import MiddleRowAnalytics from "@/components/ui/custom/analytics/MiddleRowAnalytics";
import { Flex, Heading, Text, Link } from "@radix-ui/themes";
import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";

const Home: NextPage = () => {
  return (
    <div>
      <SignedIn>
        <div className="mx-7 my-7">
          <Heading className="pb-5" size="7">
            Dashboard
          </Heading>
          <Flex gap="5" direction="column">
            <TopRowAnalytics />
            <MiddleRowAnalytics />
          </Flex>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="grid h-[50vh] place-items-center">
          <div className="flex flex-col items-center gap-2">
            <Heading size="8">Welcome to BugWatch</Heading>
            <Text as="div" color="gray">
              Please{" "}
              <SignInButton>
                <Link>sign in</Link>
              </SignInButton>{" "}
              to continue
            </Text>
          </div>
        </div>
      </SignedOut>
    </div>
  );
};

export default Home;
