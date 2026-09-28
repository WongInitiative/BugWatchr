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
        <div className="flex min-h-[132px]">
          <Inset className="shrink-0" side="left" pr="current">
            <div className="flex h-full items-center justify-center">
              <Avatar
                src={image as string}
                radius="medium"
                fallback={name?.charAt(0).toUpperCase() as string}
                color="indigo"
                // Explicit square, in px. The previous `height: 100%` could not
                // resolve, because the row's height is decided by its content
                // and the image is part of that content. The image therefore
                // fell back to its own aspect ratio at 35% width, so a tall
                // portrait rendered ~168px high inside a card that clips
                // overflow, and got visibly cut off, while a wide photo came
                // out short. A fixed size depends on nothing else, so every
                // avatar is the same square and `object-fit: cover` centres the
                // crop consistently.
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  height: "132px",
                  width: "132px",
                  flexShrink: 0,
                }}
              />
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
              <Text className="truncate" as="div" size="4" weight="medium">
                {name}
              </Text>
              <Text
                className="flex items-center gap-1"
                color="gray"
                as="div"
                size="2"
              >
                <Mail size={15} className="shrink-0" />
                <span className="truncate">{email}</span>
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
