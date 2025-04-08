"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "@/components/ui/sparkels";
import { cn } from "@/lib/utils";
import { useAuthActions } from "@convex-dev/auth/react";
import { GalleryVerticalEnd } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthProvider = "google" | "password";

export default function SignIn() {
  const { signIn } = useAuthActions();

  const handleSignIn = (authProvider: AuthProvider) => {
    signIn(authProvider);
  };

  const handleClick = () => {
    alert("Hi Jisung!!! 🎉");
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <div>
        <div className="flex flex-col gap-8">
          <div className="absolute top-0 left-0 w-full h-200">
            <Sparkles density={100} />
          </div>
          <div className="flex flex-col items-center gap-2 mb-4">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6 text-primary" />
              </div>
              <span className="sr-only">Somang</span>
            </a>
            <h1 className="text-3xl font-bold">Somang</h1>
            <div className="text-center text-sm">
              여호와께서 너를 축복하시고 지키시기 원하노라 - 민수기 6:24
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2 z-10">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="somang@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer z-10">
              로그인
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-1">
            <Button
              variant="outline"
              className="w-full cursor-pointer z-10"
              onClick={() => handleSignIn("google")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              구글 로그인
            </Button>
          </div>
        </div>
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary z-10">
        계속하면 서비스 약관에 동의하는 것으로 간주합니다.{" "}
        <a href="/terms">서비스 약관</a> 과{" "}
        <a href="/privacy">개인정보 보호 정책</a>.
      </div>
    </div>
  );
}
