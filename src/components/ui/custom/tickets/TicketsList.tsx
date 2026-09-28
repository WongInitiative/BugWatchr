"use client";

import { TextField } from "@radix-ui/themes";
import TicketsListEntry from "@/components/ui/custom/tickets/TicketsListEntry";
import { Search } from "lucide-react";
import { type ticketWithEmployeeType } from "@/lib/prismaTypes";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

type TicketsListProps = {
  data: ticketWithEmployeeType[];
};

const TicketsList = ({ data }: TicketsListProps) => {
  const [dataToShow, setDataToShow] = useState(data);
  const [inputToSearch, setInputToSearch] = useState("");
  const getTicketsByTitle = api.ticket.getTicketsByTitle.useQuery({
    input: inputToSearch,
  });

  useEffect(() => {
    const filteredData = getTicketsByTitle?.data as ticketWithEmployeeType[];
    if (inputToSearch?.length > 0) {
      setDataToShow(filteredData);
    } else {
      setDataToShow(data);
    }
  }, [data, inputToSearch, getTicketsByTitle?.data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full sm:w-auto sm:self-end">
        <TextField.Root>
          <TextField.Slot>
            <Search size={16} />
          </TextField.Slot>
          <TextField.Input
            placeholder="Search tickets"
            onChange={(e) => setInputToSearch(e.target.value)}
          />
        </TextField.Root>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dataToShow?.map((ticket) => (
          <TicketsListEntry key={ticket?.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsList;
