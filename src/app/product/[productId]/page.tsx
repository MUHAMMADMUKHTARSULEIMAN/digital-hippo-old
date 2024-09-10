import { ProductFiles } from "@/collections/ProductFile";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    productId: string
  }
}

const Page = async ({params}: PageProps) => {
  const {productId} = params
  const payload = await getPayloadClient()

  const {docs: products} = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId
      },
      approvedForSale: {
        equals: "approved"
      }
    }
  })

  const [product] = products

  if(!product) return notFound()

  const BREADCRUMBS = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 2,
      name: "Products",
      href: "/products",
    },
  ]
  
  return (
    <MaxWidthWrapper className="bg-background">
      <div className="bg-background">
        <div
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
        >
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center text-sm">
                    <Link
                    href={breadcrumb.href}
                    className="font-medium text-sm text-muted-foreground hover:text-accent-foreground"
                    >
                      {breadcrumb.name}
                    </Link>

                    {i !== BREADCRUMBS.length - 1 &&
                    <div className="ml-3">
                      <ChevronRight className="h-4 w-4 text-muted-foreground"/>
                    </div>}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4">
              {/* <h1>{product.name}</h1> */}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page;