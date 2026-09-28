import EditEmployeeDialog from "@/components/ui/custom/users/EditEmployeeDialog";
import EmployeeDetails from "@/components/ui/custom/users/EmployeeDetails";
import { type employeesWithTicketsType } from "@/lib/prismaTypes";
import { api } from "@/utils/api";
import { Button, Dialog, Heading } from "@radix-ui/themes";
import { Pencil } from "lucide-react";

import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const UserDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id, edit } = router.query;

  const getEmployee = api.employee?.getEmployee?.useQuery({
    employeeId: id as string,
  });

  const employeeData: employeesWithTicketsType =
    getEmployee?.data as employeesWithTicketsType;

  return (
    // mx-11 was 88px of horizontal margin, which left a 375px phone barely
    // 287px of usable width and squeezed the assigned-tickets table.
    <div className="mx-4 my-6 flex flex-col gap-8 sm:mx-11 sm:my-9 sm:gap-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Heading size="7">User Details</Heading>
        <Dialog.Root open={edit ? true : false}>
          <Dialog.Trigger>
            <Button variant="surface" color="iris" asChild>
              <Link href={`/users/${id as string}?edit=true`}>
                <Pencil size={15} />
                Edit
              </Link>
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            {/* i think null checking prevents input filling bug? */}
            {employeeData != null ? (
              <EditEmployeeDialog employeeData={employeeData} />
            ) : null}
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <div className="mx-0 sm:mx-7">
        {id != null ? <EmployeeDetails employeeData={employeeData} /> : null}
      </div>
    </div>
  );
};

export default UserDetailsPage;
