import CreateTicketButton from "@/components/ui/custom/tickets/CreateTicketButton";
import TicketsList from "@/components/ui/custom/tickets/TicketsList";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { Heading } from "@radix-ui/themes";
import { type ticketWithEmployeeType } from "@/lib/prismaTypes";

const TicketsPage: NextPage = () => {
  const getTickets = api.ticket.getTickets.useQuery();
  const ticketData: ticketWithEmployeeType[] =
    getTickets.data as ticketWithEmployeeType[];

  return (
    <div className="mx-7 my-7 flex-col">
      <div className="flex items-center justify-between pb-5">
        <Heading size="7">Tickets List</Heading>
        <CreateTicketButton />
      </div>
      {ticketData ? <TicketsList data={ticketData} /> : null}
    </div>
  );
};

export default TicketsPage;
