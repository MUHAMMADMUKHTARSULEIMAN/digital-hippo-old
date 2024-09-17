"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import refresh from "payload/dist/auth/operations/refresh";
import { useEffect } from "react";

interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
}

const PaymentStatus = ({orderEmail, orderId, isPaid}: PaymentStatusProps) => {
  const {data} = trpc.payment.pollOrderStatus.useQuery({orderId}, {
    enabled: isPaid === false,
    refetchInterval: (data) => (data?.isPaid ? false : 1000)
  })

  const router = /* The `useRouter` hook is typically used in Next.js applications for client-side
  routing. It provides access to the router object, allowing you to navigate between
  pages programmatically. In the provided code snippet, the `useRouter` hook is
  imported but not used in the component. If you intend to use client-side routing in
  your component, you can utilize the `useRouter` hook to access routing
  functionalities provided by Next.js. */
  useRouter()

  useEffect(() => {
    if(data?.isPaid) router.refresh()
  }, [data?.isPaid, router])
  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-ring">
      <div>
        <p className="font-medium text-accent-foreground">Shipping To</p>
        <p>{orderEmail}</p>
      </div>
      <div>
        <p className="font-medium text-accent-foreground">Payment Status</p>
        <p>{isPaid ? "Payment Verified" : "Pending Verification"}</p>
      </div>
    </div>
  )
}

export default PaymentStatus;