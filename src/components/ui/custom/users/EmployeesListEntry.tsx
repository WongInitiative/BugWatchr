"use client";

import { type employeesWithTicketsType } from "@/lib/prismaTypes";
import { api } from "@/utils/api";
import {
  Card,
  Text,
  Avatar,
  Inset,
  Badge,
  DropdownMenu,
  Button,
} from "@radix-ui/themes";
import { FolderKanban, Mail, MoreVertical, Trash2, Pencil } from "lucide-react";
import Link from "next/link";

type EmployeesListEntryProps = {
  employee: employeesWithTicketsType;
};

const EmployeesListEntry = ({ employee }: EmployeesListEntryProps) => {
  const ctx = api.useContext();
  const { id, name, email, image, userRole, tickets } = employee;

  const deleteEmployee = api.employee.delete.useMutation({
    onSuccess: () => {
      //.catch mandated by eslint
      ctx.employee.getEmployees.invalidate().catch((err) => console.log(err));
    },
  });

  const onDelete = (id: string) => {
    deleteEmployee.mutate({ id });
  };

  return (
    <Card size="2" asChild>
      <Link href={`/users/${id}`}>
        {/* min-h keeps every card the same height regardless of how short the
            text is, which in turn keeps the square avatar a consistent size. */}
        <div className="flex min-h-[104px] sm:min-h-[132px]">
          <Inset className="shrink-0" side="left" pr="current">
            <div className="flex h-full items-center justify-center">
              {/* This wrapper carries the size in px, which is what lets the
                  avatar's `height: 100%` resolve (a percentage needs a parent
                  with a definite height). Smaller on phones so the name and
                  email keep enough room to stay readable. */}
              <div className="h-[104px] w-[104px] shrink-0 sm:h-[132px] sm:w-[132px]">
              <Avatar
                src={image as string}
                radius="medium"
                fallback={name?.charAt(0).toUpperCase() as string}
                color="indigo"
                // Fills the sized wrapper above. Originally this was a bare
                // `height: 100%` with no sized ancestor, so it could not resolve
                // and each image fell back to its own aspect ratio: tall
                // portraits overflowed the card and were clipped.
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  height: "100%",
                  width: "100%",
                }}
              />
              </div>
            </div>
          </Inset>

          {/* min-w-0 lets this column shrink below its text's intrinsic width,
              so long names and emails truncate instead of widening the card. */}
          <div className="flex min-w-0 grow flex-col justify-between pl-2">
            {/* top part */}
            <div className="mb-3 flex flex-col">
              <Badge
                className="mb-2 max-w-fit"
                variant="soft"
                color={userRole === "Developer" ? "green" : "indigo"}
              >
                {userRole}
              </Badge>
              {/* Wrap rather than truncate: an ellipsised name or email is
                  unreadable, and these cards can afford the extra line. */}
              <Text className="break-words" as="div" size="4" weight="medium">
                {name}
              </Text>
              <Text
                className="flex items-start gap-1"
                color="gray"
                as="div"
                size="2"
              >
                <Mail size={15} className="mt-[3px] shrink-0" />
                <span className="min-w-0 break-words">{email}</span>
              </Text>
            </div>

            {/* bottom part */}
            <div className="flex flex-row">
              <div className="flex flex-col">
                <Text className="flex items-center gap-1" as="div" size="2">
                  <FolderKanban size={17} className="mb-[1px] shrink-0" />
                  {tickets.length === 1
                    ? `${tickets.length} Assigned Ticket`
                    : `${tickets.length} Assigned Tickets`}
                </Text>
              </div>
            </div>
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button
                className="shrink-0"
                variant="ghost"
                radius="large"
                color="gray"
                highContrast
              >
                <MoreVertical />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="solid">
              <DropdownMenu.Item className="gap-1" asChild>
                <Link href={`/users/${id}?edit=true`}>
                  Edit
                  <Pencil size={15} />
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                className="flex gap-2"
                color="red"
                onClick={() => onDelete(id)}
                asChild
              >
                <Link href="/users">
                  Delete
                  <Trash2 size={16} />
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </Link>
    </Card>
  );
};

export default EmployeesListEntry;
