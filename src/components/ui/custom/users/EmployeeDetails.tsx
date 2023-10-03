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
    <div className="flex flex-row flex-wrap gap-8">
      {/* left half */}
      <Card size="3" variant="ghost">
        <div className="flex flex-col gap-4">
          <Avatar className="h-[260px] w-[260px]">
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
      <div className="flex grow flex-col flex-wrap gap-4">
        <Heading>Assigned Tickets</Heading>
        <Table.Root className="mx-3 grow" variant="surface">
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
                  <Table.Cell className="max-w-[60px] overflow-hidden overflow-ellipsis whitespace-nowrap">
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
  );
};

export default EmployeeDetails;
