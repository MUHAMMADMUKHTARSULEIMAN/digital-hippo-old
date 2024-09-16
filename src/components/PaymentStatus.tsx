"use client";

interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
}

const PaymentStatus = ({orderEmail, orderId, isPaid}: PaymentStatusProps) => {
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