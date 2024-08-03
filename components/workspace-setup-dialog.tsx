import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Globe, ImagePlus, Lock } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";

interface WorkspaceSetupDialogProps {
  children: React.ReactNode;
}

const workspaceFormSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  logo: z.string().optional(),
});

function WorkspaceSetupDialog({ children }: WorkspaceSetupDialogProps) {
  const filePickerRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof workspaceFormSchema>>({
    defaultValues: {
      title: "",
      description: "",
      logo: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof workspaceFormSchema>) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A Workspace</DialogTitle>
          <DialogDescription>
            Workspace is a place where you can create teams and collaborate with
            them.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onFormSubmit)}
          >
            <div className="flex items-center gap-x-4 w-full mb-4">
              <input
                type="file"
                ref={filePickerRef}
                accept="image/*"
                className="hidden"
              />
              <div
                role="button"
                onClick={() => {
                  filePickerRef.current?.click();
                }}
                className="w-14 h-14 bg-muted rounded-full flex items-center justify-center cursor-pointer mt-4"
              >
                <ImagePlus className="w-4 h-4" />
              </div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-1 flex-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="My School Project" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select workspace visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          <div className="flex gap-x-4 items-center">
                            <Lock className="w-5 h-5" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold">Private</p>
                              <span className="text-xs text-muted-foreground">
                                Only members with can view and join this
                                workspace.
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          <div className="flex gap-x-4 items-center">
                            <Globe className="w-5 h-5" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold">Public</p>
                              <span className="text-xs text-muted-foreground">
                                Anyone can view and join this workspace.
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1 flex-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={5}
                      placeholder="This workspace is for my school project anyone with pass is welcome"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" isLoading={true} className="w-full">
              Create Workspace
            </Button>
            <p className="text-center text-xs text-muted">
              You can add members after creating the workspace.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default WorkspaceSetupDialog;
