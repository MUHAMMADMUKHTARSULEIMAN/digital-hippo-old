import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const nextCookies = cookies()
  const {user} = await getServerSideUser(nextCookies);

  return (
    <div className="bg-accent sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-background">
        <MaxWidthWrapper>
          <div className="border-b">
            <div className="flex h-16 items-center">
              {/*To-do: mobile navbar */}
              <MobileNav />
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="w-10 h-10" />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link href={"/sign-in"} className={buttonVariants({variant: "ghost"})}>
                      Sign in
                    </Link>
                  )}
                  {user ? <UserAccountNav user={user} /> : (
                    <Link href={"/sign-up"} className={buttonVariants({variant: "default"})}>
                      Sign up
                    </Link>
                  )}
                  <div className="ml-4 flow-root">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar;