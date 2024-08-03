"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { loginSchema } from "@/lib/zod-schemas";
import z from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { oauthSignIn } from "@/actions/oauth";
import { Separator } from "@/components/ui/separator";

function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTranstion] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof loginSchema>) => {
    startTranstion(() => {
      login(values)
        .then((res) => {
          toast({
            title: res.status ? "Login Success" : "Failed to Login",
            description: res.message,
            variant: res.status ? "default" : "destructive",
          });
          router.replace("/workspace");
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: "Error",
            description: "An error occurred",
            variant: "destructive",
          });
        });
    });
  };
  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Login </CardTitle>
        <CardDescription>
          Login to your account to access your workspace
        </CardDescription>
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
              <Button
                isLoading={pending}
                disabled={pending}
                type="submit"
                className="w-full"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?&nbsp;
          <Link href="/auth/register" className="font-semibold underline">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
