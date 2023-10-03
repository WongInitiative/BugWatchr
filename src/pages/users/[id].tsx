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
    <div className="mx-11 my-9 flex flex-col gap-10">
      <div className="flex items-center justify-between">
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

      <div className="mx-7">
        {id != null ? <EmployeeDetails employeeData={employeeData} /> : null}
      </div>
    </div>
  );
};

export default UserDetailsPage;
