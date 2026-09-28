import {
  Badge,
  Card,
  Code,
  Heading,
  Text,
  Callout,
  Table,
} from "@radix-ui/themes";
import {
  roleMap,
  statusMap,
  priorityMap,
  categoryMap,
  type badgeColor,
} from "@/lib/utils";
import { type employeesWithTicketsType } from "@/lib/prismaTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FolderKanban, Mail } from "lucide-react";

type EmployeeDetailsProps = {
  employeeData: employeesWithTicketsType;
};

const EmployeeDetails = ({ employeeData }: EmployeeDetailsProps) => {
  return (
    // Explicit stacking below `lg` rather than relying on flex-wrap, so the
    // profile card and the tickets table each get the full width on phones.
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* left half */}
      <Card size="3" variant="ghost">
        <div className="flex flex-col gap-4">
          <Avatar className="h-40 w-40 sm:h-[260px] sm:w-[260px]">
            <AvatarImage src={employeeData?.image as string} />
            <AvatarFallback className="bg-[#0144ff0f] dark:bg-[#234fff2e]">
              {employeeData?.name?.charAt(0).toUpperCase() as string}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Heading>{employeeData?.name}</Heading>
            <Text as="div" size="3" color="gray">
              id: {employeeData?.id}
            </Text>
          </div>
          <Callout.Root
            size="1"
            variant="surface"
            className="justify-center"
            color={roleMap.get(employeeData?.userRole) as badgeColor}
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            <Callout.Text
              size="3"
              weight="medium"
              color={roleMap.get(employeeData?.userRole) as badgeColor}
            >
              {employeeData?.userRole}
            </Callout.Text>
          </Callout.Root>
          <div className="flex flex-col">
            <Text className="flex items-center gap-1" as="div" size="3">
              <Mail size={15} />
              {employeeData?.email}
            </Text>
            <Text className="flex items-center gap-1" as="div" size="3">
              <FolderKanban size={16} />
              {employeeData?.tickets.length === 1
                ? `${employeeData?.tickets.length} Assigned Ticket`
                : `${employeeData?.tickets.length} Assigned Tickets`}
            </Text>
          </div>
        </div>
      </Card>

      {/* right half */}
      <div className="flex min-w-0 grow flex-col gap-4">
        <Heading>Assigned Tickets</Heading>
        {/* `min-w-0` above plus this scroll container keep the 5-column table
            from widening the page; on narrow screens it scrolls on its own. */}
        {/* Full-bleed on phones: the strip runs to both screen edges so the
            table reads as scrollable rather than clipped mid-card. */}
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <Table.Root className="min-w-[640px] sm:mx-3" variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Priority</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="w-full">
            {employeeData?.tickets.length > 0 ? (
              employeeData?.tickets.map((ticket) => (
                <Table.Row key={ticket?.id} align="center">
                  <Table.RowHeaderCell>{ticket?.title}</Table.RowHeaderCell>
                  {/* Was max-w-[60px] + nowrap + ellipsis, which clipped every
                      description to a few characters. Let it wrap instead, with
                      a floor so it cannot collapse and a ceiling so it does not
                      crowd out the status/priority/category columns. */}
                  <Table.Cell className="w-2/5 min-w-[200px] max-w-[420px] whitespace-normal break-words align-top">
                    {ticket?.content}
                  </Table.Cell>
                  <Table.Cell>
                    <Code
                      variant="soft"
                      color={
                        statusMap.get(ticket?.status as string)
                          ?.color as badgeColor
                      }
                      size="3"
                    >
                      {statusMap.get(ticket?.status as string)?.value}
                    </Code>
                  </Table.Cell>

                  <Table.Cell>
                    {ticket?.priority != null ? (
                      <Badge
                        className="max-w-fit"
                        radius="full"
                        variant="soft"
                        color={
                          priorityMap?.get(ticket?.priority)
                            ?.color as badgeColor
                        }
                      >
                        {priorityMap?.get(ticket?.priority)?.value}
                      </Badge>
                    ) : (
                      "Unassigned"
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {ticket?.category != "undefined" &&
                    ticket?.category != null ? (
                      <Badge
                        size="1"
                        color={
                          categoryMap.get(ticket?.category)?.color as badgeColor
                        }
                      >
                        {categoryMap.get(ticket?.category)?.value}
                      </Badge>
                    ) : (
                      "Unassigned"
                    )}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row align="center">
                <div className="">
                  <Text className="grow items-center align-middle" as="div">
                    No tickets assigned
                  </Text>
                </div>
              </Table.Row>
            )}
          </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
