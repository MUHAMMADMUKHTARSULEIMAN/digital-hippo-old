"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Page = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator)
  });

  const {mutate, isLoading} = trpc.auth.createPayloadUser.useMutation({

  })

  const onSubmit = ({email, password,}: TAuthCredentialsValidator) => {
    // Send data to server
    mutate({email, password})
  }
  return (
    <>
      <div className=" container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20"/>
            <h1 className="text-2xl font-bold">Create an account</h1>
            <div className="grid gap-6">
              <form>
                <div className="grid gap-2">
                  <div className="grid gap-1 py-2">
                    <Label className="justify-self-start" htmlFor="email">Email</Label>
                    <Input
                    {...register("email")}
                    placeholder="name@example.com"
                    className={cn({"focus-visible:ring-destructive": errors.email})}
                    />
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label className="justify-self-start" htmlFor="password">Password</Label>
                    <Input
                    {...register("password")}
                    placeholder="****"
                    className={cn({"focus-visible:ring-destructive": errors.password})}
                    />
                  </div>
                  <Button>Sign up</Button>
                  <div className="justify-self-center pl-4">
                    <p className="text-sm">
                      Already have an account?
                      {" "}
                      <Link href={"/sign-in"} className={buttonVariants({variant: "link", className: "pl-0"})}>
                        Sign in &rarr;
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;