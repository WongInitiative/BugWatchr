import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { useRouter } from "next/router";
import * as z from "zod";
import { api } from "@/utils/api";
import { type employeesWithTicketsType } from "@/lib/prismaTypes";
import {
  Dialog,
  TextField,
  Text,
  Button,
  Select,
  IconButton,
} from "@radix-ui/themes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { X } from "lucide-react";
import { roleMap } from "@/lib/utils";
import Link from "next/link";

type EditEmployeeDialogProps = {
  employeeData: employeesWithTicketsType;
};

const FormSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Name must be no more than 60 characters",
    })
    .min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Description is required." })
    .email({ message: "Invalid email" }),
  userRole: z.string().min(1, { message: "User role must be assigned" }),
});

const EditEmployeeDialog = ({ employeeData }: EditEmployeeDialogProps) => {
  const ctx = api.useContext();
  const router = useRouter();

  const updateEmployee = api.employee.updateUser.useMutation({
    onSuccess: () => {
      //.catch mandated by eslint
      ctx.employee.getEmployee.invalidate().catch((err) => console.log(err));
    },
  });

  const deleteEmployee = api.ticket.delete.useMutation({
    onSuccess: () => {
      //.catch mandated by eslint
      ctx.employee.getEmployees.invalidate().catch((err) => console.log(err));
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: employeeData?.name as string,
      email: employeeData?.email as string,
      userRole: employeeData?.userRole,
    },
  });

  //checks if each input is valid (from react hooks form)
  const { isValid } = useFormState({ control: form.control });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const { name, email, userRole } = data;

    updateEmployee.mutate({
      id: employeeData?.id,
      name: name,
      email: email,
      userRole: userRole,
    });
  };

  const onDelete = (id: string) => {
    deleteEmployee.mutate({ id });
  };

  /* eslint-disable @typescript-eslint/no-misused-promises*/
  return (
    <>
      <Dialog.Title>
        <div className="flex justify-between align-top">
          <span>Edit User Details</span>
          <Dialog.Close>
            <IconButton
              variant="ghost"
              radius="full"
              color="gray"
              size="3"
              asChild
            >
              <Link href={`/users/${employeeData?.id}`}>
                <X size={16} />
              </Link>
            </IconButton>
          </Dialog.Close>
        </div>
      </Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Make changes to this user
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
                    <TextField.Input placeholder="Enter user name" {...field} />
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
                    <TextField.Input placeholder="Enter user name" {...field} />
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
            <Dialog.Close>
              <Button
                color="red"
                variant="surface"
                onClick={() => onDelete(employeeData?.id)}
                asChild
              >
                <Link href="/users">Delete</Link>
              </Button>
            </Dialog.Close>

            {isValid ? (
              <Dialog.Close>
                <Button
                  type="submit"
                  variant="solid"
                  onClick={() => router.push(`/users/${employeeData?.id}`)}
                >
                  Save
                </Button>
              </Dialog.Close>
            ) : (
              <Button type="submit">Save</Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditEmployeeDialog;
