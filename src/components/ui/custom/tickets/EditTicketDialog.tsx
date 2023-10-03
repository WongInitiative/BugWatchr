import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { useRouter } from "next/router";
import * as z from "zod";
import { api } from "@/utils/api";
import { type ticketWithEmployeeType } from "@/lib/prismaTypes";
import {
  Dialog,
  TextField,
  Text,
  Button,
  TextArea,
  Select,
  Avatar,
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
import { type Employee } from "@prisma/client";

import { X } from "lucide-react";
import { categoryMap, statusMap } from "@/lib/utils";
import Link from "next/link";

type EditTicketProps = {
  ticketData: ticketWithEmployeeType;
};

const FormSchema = z.object({
  title: z
    .string()
    .max(60, {
      message: "Title must be no more than 60 characters",
    })
    .min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Description is required" }),
  category: z.string().optional(),
  priority: z.string().min(1, { message: "Priority is required" }),
  status: z.string().optional(),
  employeeId: z.string().optional(),
});

const EditTicketDialog = ({ ticketData }: EditTicketProps) => {
  const ctx = api.useContext();
  const router = useRouter();

  const getEmployees = api.employee.getEmployees.useQuery();
  const updateTicket = api.ticket.updateTicket.useMutation({
    onSuccess: () => {
      //.catch mandated by eslint
      ctx.ticket.getTicket.invalidate().catch((err) => console.log(err));
    },
  });

  const deleteTicket = api.ticket.delete.useMutation({
    onSuccess: () => {
      //.catch mandated by eslint
      ctx.ticket.getTickets.invalidate().catch((err) => console.log(err));
    },
  });

  const employeesList: Employee[] = getEmployees?.data as Employee[];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: ticketData?.title as string,
      content: ticketData?.content as string,
      priority: ticketData?.priority,
      category: ticketData?.category as string,
      status: ticketData?.status as string,
      employeeId: ticketData?.employeeId as string,
    },
  });

  //checks if each input is valid (from react hooks form)
  const { isValid } = useFormState({ control: form.control });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const { title, content, priority, status, employeeId, category } = data;

    updateTicket.mutate({
      id: ticketData?.id,
      title: title,
      content: content,
      priority: priority,
      status: status as string,
      employeeId: employeeId as string,
      category: category as string,
    });
  };

  const onDelete = (id: string) => {
    deleteTicket.mutate({ id });
  };

  /* eslint-disable @typescript-eslint/no-misused-promises*/
  return (
    <>
      <Dialog.Title>
        <div className="flex justify-between align-top">
          <span>Edit Ticket</span>
          <Dialog.Close>
            <IconButton
              variant="ghost"
              radius="full"
              color="gray"
              size="3"
              asChild
            >
              <Link href={`/tickets/${ticketData?.id}`}>
                <X size={16} />
              </Link>
            </IconButton>
          </Dialog.Close>
        </div>
      </Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Make changes to this ticket
      </Dialog.Description>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Text
                      className="flex gap-1"
                      as="div"
                      size="2"
                      weight="bold"
                    >
                      Title
                      <span className="text-red-600">*</span>
                    </Text>
                  </FormLabel>
                  <FormControl>
                    <TextField.Input
                      placeholder="Enter ticket title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Text
                      className="flex gap-1"
                      as="div"
                      size="2"
                      weight="bold"
                    >
                      Description
                      <span className="text-red-600">*</span>
                    </Text>
                  </FormLabel>
                  <FormControl>
                    <TextArea
                      size="3"
                      placeholder="Add description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Text
                      className="flex gap-1"
                      as="div"
                      size="2"
                      weight="bold"
                    >
                      Priority
                      <span className="text-red-600">*</span>
                    </Text>
                  </FormLabel>
                  <FormControl>
                    <Select.Root onValueChange={field.onChange} {...field}>
                      <Select.Trigger placeholder="Assign priority..." />
                      <Select.Content>
                        <Select.Item key="low" value="low">
                          Low
                        </Select.Item>
                        <Select.Item key="medium" value="medium">
                          Medium
                        </Select.Item>
                        <Select.Item key="high" value="high">
                          High
                        </Select.Item>
                        <Select.Item key="critical" value="critical">
                          Critical
                        </Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Text
                      className="flex gap-1"
                      as="div"
                      size="2"
                      weight="bold"
                    >
                      Status
                    </Text>
                  </FormLabel>
                  <FormControl>
                    <Select.Root onValueChange={field.onChange} {...field}>
                      <Select.Trigger placeholder="Assign status" />
                      <Select.Content>
                        {[...statusMap.entries()].map((entry) => (
                          <Select.Item key={entry[0]} value={entry[0]}>
                            {entry[1].value}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Text
                      className="flex gap-1"
                      as="div"
                      size="2"
                      weight="bold"
                    >
                      Category
                    </Text>
                  </FormLabel>
                  <FormControl>
                    <Select.Root onValueChange={field.onChange} {...field}>
                      <Select.Trigger placeholder="Assign category" />
                      <Select.Content>
                        <Select.Item key="undefined" value="undefined">
                          None
                        </Select.Item>
                        {[...categoryMap.entries()].map((entry) => (
                          <Select.Item key={entry[0]} value={entry[0]}>
                            {entry[1].value}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Text as="div" size="2" weight="bold">
                      Assigned To
                    </Text>
                  </FormLabel>
                  <FormControl>
                    <Select.Root onValueChange={field.onChange} {...field}>
                      <Select.Trigger
                        placeholder="Assign"
                        style={{
                          paddingTop: "1.5rem",
                          paddingBottom: "1.5rem",
                        }}
                      />
                      <Select.Content className="py-5">
                        <Select.Item className="py-5" key="" value="">
                          <div className="flex max-w-fit items-center gap-3">
                            <Avatar
                              radius="full"
                              size="2"
                              fallback={<div className="text-xs">N/A</div>}
                            />
                            <>Unassigned</>
                          </div>
                        </Select.Item>
                        {employeesList?.map((employee) => (
                          <Select.Item
                            className="py-5"
                            key={employee?.id}
                            value={employee?.id}
                          >
                            <div className="flex max-w-fit items-center gap-3">
                              <Avatar
                                radius="full"
                                size="2"
                                src={employee.image as string}
                                fallback={
                                  employee?.name
                                    ?.charAt(0)
                                    .toUpperCase() as string
                                }
                              />
                              <>{employee.name}</>
                            </div>
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
                onClick={() => onDelete(ticketData?.id)}
                asChild
              >
                <Link href="/tickets">Delete</Link>
              </Button>
            </Dialog.Close>

            {isValid ? (
              <Dialog.Close>
                <Button
                  type="submit"
                  variant="solid"
                  onClick={() => router.push(`/tickets/${ticketData?.id}`)}
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

export default EditTicketDialog;
