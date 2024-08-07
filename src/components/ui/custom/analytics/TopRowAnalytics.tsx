import { api } from "@/utils/api";
import { type Ticket } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";

const numTicketsByStatus = (tstatus: string) => {
  const ticketsByStatus = api.ticket.getTicketsByStatus.useQuery({
    status: tstatus,
  });

  const data: Ticket[] = ticketsByStatus?.data as Ticket[];

  if (tstatus === "closed") {
    const today: string = new Intl.DateTimeFormat("en-US").format(new Date());

    const closedTicketsToday = data?.filter((ticket) => {
      const ticketDate = new Intl.DateTimeFormat("en-US").format(
        ticket.statusUpdatedAt
      );

      return ticketDate === today;
    });

    return closedTicketsToday?.length;
  }

  return data?.length;
};

const numTicketsUnassigned = () => {
  const unassignedTickets = api.ticket.getUnassignedTickets.useQuery();
  const data: Ticket[] = unassignedTickets.data as Ticket[];

  return data?.length;
};
//TODO: fix responsive stretching of cards
const TopRowAnalytics = () => {
  const unassignedTickets = numTicketsUnassigned();
  const openTickets = numTicketsByStatus("open");
  const closedTickets = numTicketsByStatus("closed");
  const inProgressTickets = numTicketsByStatus("in_progress");

  return (
    <div className="flex flex-row flex-wrap justify-between gap-6">
      <Card
        className="w-[calc((100%-3*24px)/4)] min-w-[21%] grow"
        variant="classic"
      >
        <Flex className="px-3 py-1" direction="column">
          <Text
            className="pb-2"
            as="div"
            size="2"
            style={{ letterSpacing: "0.025em" }}
          >
            Currently Open
          </Text>

          <Text as="div" size="7" weight="bold" align="left">
            {openTickets}
            <Text size="2" weight="regular" ml="1">
              {openTickets === 1 ? "Ticket" : "Tickets"}
            </Text>
          </Text>
        </Flex>
      </Card>

      <Card
        className="w-[calc((100%-3*24px)/4)] min-w-[21%] grow"
        variant="classic"
      >
        <Flex className="px-3 py-1" direction="column">
          <Text
            className="pb-2"
            as="div"
            size="2"
            style={{ letterSpacing: "0.025em" }}
          >
            Closed Today
          </Text>

          <Text as="div" size="7" weight="bold" align="left">
            {closedTickets}
            <Text size="2" weight="regular" ml="1">
              {closedTickets === 1 ? "Ticket" : "Tickets"}
            </Text>
          </Text>
        </Flex>
      </Card>

      <Card
        className="w-[calc((100%-3*24px)/4)] min-w-[21%] grow"
        variant="classic"
      >
        <Flex className="px-3 py-1" direction="column">
          <Text
            className="pb-2"
            as="div"
            size="2"
            style={{ letterSpacing: "0.025em" }}
          >
            In Progress
          </Text>

          <Text as="div" size="7" weight="bold" align="left">
            {inProgressTickets}
            <Text size="2" weight="regular" ml="1">
              {inProgressTickets === 1 ? "Ticket" : "Tickets"}
            </Text>
          </Text>
        </Flex>
      </Card>

      <Card
        className="w-[calc((100%-3*24px)/4)] min-w-[21%] grow"
        variant="classic"
      >
        <Flex className="px-3 py-1" direction="column">
          <Text
            className="pb-2"
            as="div"
            size="2"
            style={{ letterSpacing: "0.025em" }}
          >
            Unassigned
          </Text>

          <Text as="div" size="7" weight="bold" align="left">
            {unassignedTickets}
            <Text size="2" weight="regular" ml="1">
              {unassignedTickets === 1 ? "Ticket" : "Tickets"}
            </Text>
          </Text>
        </Flex>
      </Card>
    </div>
  );
};

export default TopRowAnalytics;
