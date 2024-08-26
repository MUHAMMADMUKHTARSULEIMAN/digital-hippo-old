"use client";

import { ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

const Cart = () => {
  const itemCount = 0;
  const fee = 1;

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 p-2 flex items-center">
        <ShoppingCart className="h-6 w-6 flex-shrink-0 text-muted-foreground group-hover:text-accent-foreground" aria-hidden="true"/>
        <span className="ml-2 text-sm font-medium text-muted-foreground group-hover:text-accent-foreground">
          {itemCount}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
          <div className="flex w-full flex-col pr-6">
            {/* To-do: cart logic */}
            Cart items
          </div>
          <div className="space-y-4 pr-6">
            <Separator />
            <div className="space-y-1.5 text-sm">
              <div className="flex">
                <span className="flex-1">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex">
                <span className="flex-1">Transaction Fee</span>
                <span>{formatPrice(fee)}</span>
              </div>
            </div>
            <SheetFooter>
              <SheetTrigger asChild>
                <Link href={"/cart"} className={buttonVariants({className: "w-full",})}>Continue to Checkout </Link>
              </SheetTrigger>
            </SheetFooter>
          </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1" aria-hidden="true">
            <div className="relative h-60 w-60 mb-4 text-muted-foreground">
              <Image src="/hippo-empty-cart.png" fill alt="Empty shopping cart"/>
            </div>
            <div className="font-semibold text-xl">
              Your cart is empty.
            </div>
            <SheetTrigger asChild>
              <Link
              href={"/products"}
              className={buttonVariants({variant: "link", size: "sm", className: "text-sm text-muted-foreground"})}>
                Add items to your cart to checkout.
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart;