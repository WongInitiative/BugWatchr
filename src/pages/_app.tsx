import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "@/components/ui/custom/ThemeProvider";
import { ClerkProvider, Show } from "@clerk/nextjs";
import { MainNav } from "@/components/ui/custom/MainNav";
import { MobileNav, SideNav } from "@/components/ui/custom/SideNav";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Bug Watchr</title>
        <meta
          name="description"
          content="This is a Bug Ticket Tracking Application"
        />
        {/* Next's default viewport tag omits initial-scale, which lets some
            mobile browsers apply their own zoom on first paint. */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Theme grayColor="slate" radius="large">
          <main>
            <MainNav />
            <Show when="signed-in">
              <MobileNav />
            </Show>
            <div className="flex items-start">
              <Show when="signed-in">
                <SideNav />
              </Show>

              {/* `min-w-0` lets this flex child shrink below its content's
                  intrinsic width, so wide tables and charts scroll inside it
                  instead of stretching the page and causing a horizontal
                  scrollbar on the whole document. */}
              <div className="min-h-screen min-w-0 flex-grow rounded bg-[#F4F4F4] dark:bg-[#111315]">
                <Component {...pageProps} />
              </div>
            </div>
          </main>
        </Theme>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
