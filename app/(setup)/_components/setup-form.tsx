"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { set, z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Globe, ImagePlus, Lock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import SetupHeading from "./heading";
import { useEdgeStore } from "@/lib/edgestore";
import useSWRMutation from "swr/mutation";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const setupSchema = z.object({
  icon: z.string().min(1, { message: "Please upload an icon" }),
  title: z.string().min(5),
  description: z.string().min(30),
  isPrivate: z.boolean(),
});

function SetupForm({
  setAddMemberScreen,
  setWorkspaceId,
}: {
  setAddMemberScreen: (state: boolean) => void;
  setWorkspaceId: (id: string) => void;
}) {
  const { toast } = useToast();
  const [file, setFile] = React.useState<File | null>(null);
  const filePickerRef = React.useRef<HTMLInputElement>(null);
  // TODO: Clean up this mutation
  const { trigger, isMutating } = useSWRMutation(
    "api/workspace",
    (url, { arg }: { arg: z.infer<typeof setupSchema> }) =>
      axios.post(url, arg),
    {
      onSuccess: () => {
        setAddMemberScreen(true);
      },
    }
  );

  const { edgestore } = useEdgeStore();
  const form = useForm<z.infer<typeof setupSchema>>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      icon: "",
      title: "",
      description: "",
      isPrivate: false,
    },
  });

  const onFormSubmit = async (values: z.infer<typeof setupSchema>) => {
    if (file) {
      const fileRes = await edgestore.publicFiles.upload({ file });
      trigger({ ...values, icon: fileRes.url })
        .then((res) => {
          toast({
            title: "Workspace created!",
            description: "Your workspace has been created successfully",
          });
          console.log(res.data);
          setWorkspaceId(res.data.id);
          setAddMemberScreen(true);
        })
        .catch((err) => {
          toast({
            title: "Something went wrong!",
            description: "Error creating workspace, please try again",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <>
      <SetupHeading
        title="Setup your workspace"
        description="Get started by creating a workspace"
      />
      <Separator />
      <Form {...form}>
        <form
          className="space-y-4 my-6"
          onSubmit={form.handleSubmit(onFormSubmit)}
        >
          <div className="flex items-center gap-x-4 w-full mb-4">
            <input
              type="file"
              ref={filePickerRef}
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                  form.setValue("icon", e.target.files[0].name);
                }
              }}
              accept="image/*"
              className="hidden"
            />
            <div
              role="button"
              onClick={() => {
                filePickerRef.current?.click();
              }}
              className={cn(
                "w-14 h-14 bg-muted rounded-full flex items-center justify-center cursor-pointer mt-4 overflow-hidden p-2.5",
                form.formState.errors.icon && !file && "ring-2 ring-destructive"
              )}
            >
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImagePlus className="w-4 h-4" />
              )}
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1 flex-1">
                  <FormLabel>Workspace Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Team Projects" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {form.formState.errors.icon && !file && (
            <FormMessage>{form.formState.errors.icon.message}</FormMessage>
          )}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1 flex-1">
                <FormLabel>Workspace Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    placeholder="A shared space for brainstorming, task management, and scheduling. Collaborate with your team, keep track of tasks, and plan your projects with ease."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 py-3 shadow-sm">
                <div className="inline-flex items-center gap-x-4">
                  {field.value === true ? (
                    <Lock className="w-6 h-6" />
                  ) : (
                    <Globe className="w-6 h-6" />
                  )}
                  <div className="space-y-0.5">
                    <FormLabel>
                      {field.value === true
                        ? "Private Workspace"
                        : "Public Workspace"}
                    </FormLabel>
                    <FormDescription>
                      {field.value === true
                        ? "Only invited members can access this workspace"
                        : "Anyone with the link can access this workspace"}
                    </FormDescription>
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" isLoading={isMutating} className="w-full">
            Create Workspace
          </Button>
        </form>
      </Form>
    </>
  );
}

export default SetupForm;
