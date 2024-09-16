import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { Product, ProductFile } from "@/payload-types";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/config";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({searchParams}: PageProps) => {
  const orderId = searchParams.orderId

  const {user} = await getServerSideUser(cookies())

  const payload = await getPayloadClient()

  const {docs: orders} = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId
      }
    }
  })

  const [order] = orders

  if(!order) return notFound()

  const orderUserId = typeof order.user === "string" ? order.user : order.user.id

  if(orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`)
  }
  return (
    <main className="relative lg:min-h-full">
      <div className="hidden h-80 overflow-hidden lg:block lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr12`">
        <Image src="/checkout-thank-you.jpg" alt="Thank You" className="h-full w-full object-cover object-center"/>
      </div>
      <div>
        <div
        className="mx-auto max-w-2xl px-4 py-16
        sm:px-6 sm:py-24
        md:block
        lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32
        xl:gap-x-24"
        >
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-primary-600">Order Successful</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-accent-foreground sm:text-5xl">Thanks for Ordering</h1>
            {order._isPaid ? <p className="mt-2 text-base text-muted-foreground">
              Your order was processed and your assets are available for download. we&apos;ve sent your receipt and order details to {typeof order.user !== "string" && <span className="font-medium text-accent-foreground">order.user.email</span>}. 
            </p> : <p>
              Your order is being processed. Hang tight; we&apos;ll send you confirmation very soon.
            </p>}
            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order Number:</div>
              <div className="mt-2 text-accent-foreground">{order.id}</div>
              <ul className="mt-6 divide-y divide-muted border-t text-sm font-medium text-muted-foreground">
                {(order.products as Product[]).map((product) => {
                  const label = PRODUCT_CATEGORIES.find(({value}) => value === product.category)?.label
                  const downloadUrl = (product.product_files as ProductFile).url as string
                  const {image} = product.images[0]

                  return (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <div className="relative h-24 w-24"></div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page;