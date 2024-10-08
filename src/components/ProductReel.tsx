"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { trpc } from "@/trpc/client";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import ProductListing from "./ProductListing";

interface ProductReelProps {
  title?: string,
  subtitle?: string,
  href?: string,
  query: TQueryValidator
}

const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const {title, subtitle, href, query} = props

  const {data: queryResults, isLoading} = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMIT, query
    },
    {
      getNextPageParam: (lastPage) => lastPage.NextPage,
    },
  )

  const products = queryResults?.pages.flatMap((page) => page.items)

  let map: (Product | null)[] = []
  if(products && products.length) {
    // @ts-ignore: TypeScript is a dumb, paranoid, overactive piece of shit
    map = products
  }
  else if(isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null)
  }

  console.log("products:", products)

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title && <h1 className="text-2xl font-bold text-primary-foreground sm:text-3xl">{title}</h1>}
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {href && <Link className={buttonVariants({variant: "link" ,className: "hidden md:block"})} href={href}>Shop the Collection &rarr;</Link>}
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div
          className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-10 md:grid-cols-4 lg:gap-x-8"
          >
            {map.map((product, index) => (
              <ProductListing product={product} key={index} index={index}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReel;