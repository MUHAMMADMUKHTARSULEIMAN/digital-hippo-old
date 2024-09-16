import Image from "next/image";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = ({searchParams}: PageProps) => {
  return (
    <main className="relative lg:min-h-full">
      <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr12`">
        <Image src="/checkout-thank-you.jpg" alt="Thank You" className="h-full w-full object-cover object-center"/>
      </div>
      <div>
        <div
        className="mx-auto max-w-2xl px-4 py-16 hidden
        sm:px-6 sm:py-24
        md:block
        lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32
        xl:gap-x-24"
        >
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-primary-600">Order Successful</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-accent-foreground sm:text-5xl">Thanks for Ordering</h1>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page;