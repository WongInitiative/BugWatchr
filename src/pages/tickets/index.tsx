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
    <div className="mx-4 my-5 flex-col sm:mx-7 sm:my-7">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <Heading size="7">Tickets List</Heading>
        <CreateTicketButton />
      </div>
      {ticketData ? <TicketsList data={ticketData} /> : null}
    </div>
  );
};

export default TicketsPage;
