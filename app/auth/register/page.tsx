"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/lib/zod-schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTransition } from "react";
import { register } from "@/actions/register";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { oauthSignIn } from "@/actions/oauth";
import { Separator } from "@/components/ui/separator";

function SignUpPage() {
  const { toast } = useToast();
  const [pending, startTranstion] = useTransition();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof signUpSchema>) => {
    startTranstion(async () => {
      const res = await register(values);
      toast({
        title: res.status ? "Account Created" : "Failed to create account",
        description: res.message || "Account created successfully",
        variant: res.status ? "default" : "destructive",
      });
    });
  };

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button
            variant="outline"
            onClick={() => oauthSignIn("github")}
            type="button"
            className="w-full"
          >
            Sign up with Github
          </Button>
          <Button
            variant="outline"
            onClick={() => oauthSignIn("google")}
            type="button"
            className="w-full"
          >
            Sign up with Google
          </Button>
        </div>

        <Separator className="my-4" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="grid gap-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="johndoe19" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="email@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="securepassword"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button isLoading={pending} type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?&nbsp;
          <Link href="/auth/login" className="font-semibold underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignUpPage;
