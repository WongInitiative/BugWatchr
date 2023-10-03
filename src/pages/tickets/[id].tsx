import { type NextPage } from "next";
import { useRouter } from "next/router";
import TicketDetails from "@/components/ui/custom/tickets/TicketDetails";
import { Button, Heading, Dialog } from "@radix-ui/themes";
import { Pencil } from "lucide-react";
import EditTicketDialog from "@/components/ui/custom/tickets/EditTicketDialog";
import { api } from "@/utils/api";
import { type ticketWithEmployeeType } from "@/lib/prismaTypes";
import Link from "next/link";

const TicketDetailsPage: NextPage = () => {
  const router = useRouter();
  //you can destructure all custom url params as well; returns undefined if DNE
  const { id, edit } = router.query;

  const getTicket = api.ticket?.getTicket?.useQuery({
    ticketId: id as string,
  });

  const ticketData: ticketWithEmployeeType =
    getTicket?.data as ticketWithEmployeeType;

  return (
    <div className="mx-7 my-7 flex flex-col">
      <div className="flex items-center justify-between pb-5">
        <Heading>Ticket Details</Heading>
        <Dialog.Root open={edit ? true : false}>
          <Dialog.Trigger>
            <Button variant="surface" color="iris" asChild>
              <Link href={`/tickets/${id as string}?edit=true`}>
                <Pencil size={15} />
                Edit
              </Link>
            </Button>
          </Dialog.Trigger>

          <Dialog.Content>
            {/* i think null checking prevents input filling bug? */}
            {ticketData != null ? (
              <EditTicketDialog ticketData={ticketData} />
            ) : null}
          </Dialog.Content>
        </Dialog.Root>
      </div>

      {id != null ? <TicketDetails ticketData={ticketData} /> : null}
    </div>
  );

  // return (
  //   <div className="mx-7 my-7 flex-col">
  //     <div className="flex items-center justify-between pb-5">
  //       <Heading>Ticket Details</Heading>
  //       <Button variant="soft">Edit</Button>
  //     </div>

  //     <div>
  //       <p>Ticket Details</p>
  //       <Card>
  //         <CardTitle></CardTitle>
  //         <CardContent>
  //           <div className="flex flex-col">
  //             {/** top part */}
  //             <div className="flex grow flex-row justify-between pb-3">
  //               <div className="mb-3">
  //                 <div>{data?.title}</div>
  //                 <div>ID: {id}</div>
  //                 <div>Status: {data?.status}</div>
  //                 <div className="mb-5 flex flex-row">
  //                   <p>Assign To: &nbsp;</p>
  //                   <>
  //                     <Avatar>
  //                       <AvatarImage
  //                         src={image}
  //                         alt="Profile pic of this user"
  //                       />
  //                       <AvatarFallback>CN</AvatarFallback>
  //                     </Avatar>
  //                     {employeeName}{" "}
  //                   </>
  //                 </div>
  //               </div>
  //               <div className="flex flex-row"></div>
  //               Edit
  //             </div>
  //           </div>
  //           <div className="flex grow flex-col">
  //             <div className="pb-4">
  //               <p> Ticket Description: &nbsp;</p>
  //             </div>
  //             {data?.content}
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   </div>
  // );
};

export default TicketDetailsPage;
