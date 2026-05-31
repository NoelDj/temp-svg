"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSignUp } from "../hooks/UseSignUp";
import { TriangleAlert } from "lucide-react";

export const SignUpCard = () => {
    const mutation = useSignUp()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("dea2")
    const [password, setPassword] = useState("")

    const onProviderSignUp = (provider: "github" | "google") => {
        signIn(provider, { callbackUrl: "/" })
    }

    const onCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutation.mutate({
          name,
          email,
          password
        }, {
          onSuccess: () => {
            signIn("credentials", {
              email,
              password,
              callbackUrl: "/",
          });
          }
        })
    }

    return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          Create an account
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!mutation.error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert className="size-4" />
              <p>Something went wrong</p>
          </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialSignUp} className="space-y-2.5 mb-8">
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                type="text"
                required
                disabled={mutation.isPending}
            />
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required
                disabled={mutation.isPending}
            />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                required
                disabled={mutation.isPending}
            />
            <Button type="submit" className="w-full" size="lg" disabled={mutation.isPending}>
                Continue
            </Button>
        </form>
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignUp("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="mr-2 size-5 top-2.5 left-2.5 absolute" />
            Continue with Google
          </Button>
          <Button
            onClick={() => onProviderSignUp("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="mr-2 size-5 top-2.5 left-2.5 absolute" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account? <Link href="/sign-in"><span className="text-sky-700 hover:underline">Sign in</span></Link>
        </p>
      </CardContent>
    </Card>
  );
};