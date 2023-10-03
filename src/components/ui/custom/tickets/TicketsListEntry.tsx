"use client";

import {
  Card,
  Text,
  Badge,
  DropdownMenu,
  Button,
  Avatar,
} from "@radix-ui/themes";
import { MoreVertical, Trash2, Pencil, MessageSquare } from "lucide-react";
import Link from "next/link";
import { categoryMap, type badgeColor, priorityMap } from "@/lib/utils";
import { type ticketWithEmployeeType } from "@/lib/prismaTypes";
import { api } from "@/utils/api";

type TicketsListEntryProps = {
  ticket: ticketWithEmployeeType;
};

const TicketsListEntry = ({ ticket }: TicketsListEntryProps) => {
  const ctx = api.useContext();
  const { id, title, category, priority, employee } = ticket;

  const deleteTicket = api.ticket.delete.useMutation({
    onSuccess: () => {
      //.catch mandated by eslint
      ctx.ticket.getTickets.invalidate().catch((err) => console.log(err));
    },
  });

  const onDelete = (id: string) => {
    deleteTicket.mutate({ id });
  };

  return (
    <Card size="2" asChild>
      <Link href={`/tickets/${id}`}>
        <div className="flex h-full grow pl-2">
          <div className="flex grow flex-col justify-between">
            {/* top part */}
            <div className="mb-3 flex flex-col gap-2">
              <Text as="div" size="5" weight="medium">
                {title}
              </Text>

              <div className="flex flex-col gap-1">
                {/* TODO: multiple categories available+display */}
                {category != "undefined" && category != null ? (
                  <Badge
                    className="max-w-fit"
                    variant="soft"
                    color={categoryMap?.get(category)?.color as badgeColor}
                  >
                    {categoryMap?.get(category)?.value}
                  </Badge>
                ) : null}

                {priority != null ? (
                  <Badge
                    className="max-w-fit"
                    radius="full"
                    variant="soft"
                    color={priorityMap?.get(priority)?.color as badgeColor}
                  >
                    {priorityMap?.get(priority)?.value}
                  </Badge>
                ) : null}
              </div>
            </div>

            {/* bottom part */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-2">
                <>
                  <Avatar
                    src={employee?.image as string}
                    radius="full"
                    fallback={
                      employee ? (
                        (employee?.name?.charAt(0).toUpperCase() as string)
                      ) : (
                        <div className="text-xs">N/A</div>
                      )
                    }
                    color="indigo"
                    size="2"
                  />
                  <Text as="span" size="2">
                    {employee ? employee?.name : "Unassigned"}
                  </Text>
                </>
              </div>

              <Text
                className="flex items-center gap-1"
                color="gray"
                as="div"
                size="1"
              >
                <MessageSquare size={14} />0 Comments
              </Text>
            </div>
          </div>

          {/*second half*/}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="ghost" radius="large" highContrast color="gray">
                <MoreVertical />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft">
              <DropdownMenu.Item className="gap-1" asChild>
                <Link href={`/tickets/${id}?edit=true`}>
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
                <Link href="/tickets">
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

export default TicketsListEntry;
