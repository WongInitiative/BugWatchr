// import dynamic from "next/dynamic";
import { Title, BarChart } from "@tremor/react";
import { Card } from "@radix-ui/themes";
import { api } from "@/utils/api";
import CategoryTicketsPieChart from "@/components/ui/custom/analytics/CategoryTicketsPieChart";

const MiddleRowAnalytics = () => {
  const getTicketsByPriority =
    api.ticket.getOpenTicketsGroupedByPriority.useQuery();

  const priorityTicketsData = getTicketsByPriority.data;

  const dataMap = new Map([
    ["low", 0],
    ["medium", 0],
    ["high", 0],
    ["critical", 0],
  ]);

  priorityTicketsData?.forEach((ticket) => {
    const { priority, _count } = ticket;

    dataMap.set(priority, _count.priority);
  });

  const chartdata = [
    {
      name: "Low",
      "Number of Tickets": dataMap.get("low"),
    },
    {
      name: "Medium",
      "Number of Tickets": dataMap.get("medium"),
    },
    {
      name: "High",
      "Number of Tickets": dataMap.get("high"),
    },
    {
      name: "Critical",
      "Number of Tickets": dataMap.get("critical"),
    },
  ];

  return (
    // Stacks on phones, then 2/3 + 1/3 from `lg`. The old min-w-[65%] /
    // max-w-[35%] pair forced both charts side by side at every width.
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="min-w-0 lg:col-span-2">
        <Card size="2">
          <div className="flex flex-col py-1">
            <Title className="pl-4 text-lg tracking-wide">
              Tickets By Priority
            </Title>
            <BarChart
              className="mt-4"
              data={chartdata}
              index="name"
              categories={["Number of Tickets"]}
              colors={["blue"]}
              yAxisWidth={48}
              allowDecimals={false}
            />
          </div>
        </Card>
      </div>
      <CategoryTicketsPieChart className="min-w-0" />
    </div>
  );
};

export default MiddleRowAnalytics;
