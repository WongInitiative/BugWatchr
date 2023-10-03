import {
  IconButton,
  Button,
  Dialog,
  TextField,
  Text,
  Select,
} from "@radix-ui/themes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import * as z from "zod";
import { api } from "@/utils/api";
import { UserPlus, X } from "lucide-react";
import { roleMap } from "@/lib/utils";

const getImage = async () => {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();

  return data?.results[0].picture.large;
};

const CreateUserButton = () => {
  const ctx = api.useContext();
  const createUser = api.employee.create.useMutation({
    onSuccess: () => {
      //.catch mandated by eslint
      ctx.employee.getEmployees.invalidate().catch((err) => console.log(err));
    },
  });

  const FormSchema = z.object({
    name: z
      .string()
      .max(30, {
        message: "Name must be no more than 60 characters",
      })
      .min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email" }),
    image: z.string().optional(),
    userRole: z.string().min(1, { message: "User role must be assigned" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      userRole: "Developer",
    },
  });

  //checks if each input is valid (from react hooks form)
  const { isValid } = useFormState({ control: form.control });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { name, email, userRole } = data;

    const image = await getImage();

    createUser.mutate({
      name: name,
      email: email,
      image: image,
      userRole: userRole,
    });
  };

  /* eslint-disable @typescript-eslint/no-misused-promises*/
  return (
    <div className="flex-end">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="soft">
            <UserPlus size={18} /> Add User
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>
            <div className="flex justify-between align-top">
              <span>Add New User</span>
              <Dialog.Close>
                <IconButton
                  variant="ghost"
                  radius="full"
                  color="gray"
                  size="3"
                  asChild
                >
                  <X size={16} />
                </IconButton>
              </Dialog.Close>
            </div>
          </Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Enter user details
          </Dialog.Description>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Text
                          className="flex gap-1"
                          as="div"
                          size="2"
                          weight="bold"
                        >
                          Name
                          <span className="text-red-600">*</span>
                        </Text>
                      </FormLabel>
                      <FormControl>
                        <TextField.Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Text
                          className="flex gap-1"
                          as="div"
                          size="2"
                          weight="bold"
                        >
                          Email
                          <span className="text-red-600">*</span>
                        </Text>
                      </FormLabel>
                      <FormControl>
                        <TextField.Input
                          placeholder="Email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="userRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Text
                          className="flex gap-1"
                          as="div"
                          size="2"
                          weight="bold"
                        >
                          User Role
                          <span className="text-red-600">*</span>
                        </Text>
                      </FormLabel>
                      <FormControl>
                        <Select.Root onValueChange={field.onChange} {...field}>
                          <Select.Trigger placeholder="Assign status" />
                          <Select.Content>
                            {[...roleMap.entries()].map((entry) => (
                              <Select.Item key={entry[0]} value={entry[0]}>
                                {entry[0]}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 flex flex-row justify-end gap-3">
                {isValid ? (
                  <Dialog.Close>
                    <Button type="submit" color="green">
                      Add
                    </Button>
                  </Dialog.Close>
                ) : (
                  <Button type="submit" color="green">
                    Add
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default CreateUserButton;
