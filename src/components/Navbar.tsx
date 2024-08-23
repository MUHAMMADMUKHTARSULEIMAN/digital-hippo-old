import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <div className="bg-accent sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-background">
        <MaxWidthWrapper>
          <div className="border-b">
            <div className="flex h-16 items-center">
              {/*To-do: mobile navbar */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="w-10 h-10" />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar;