import CreateUserButton from "@/components/ui/custom/users/CreateUserButton";
import EmployeesList from "@/components/ui/custom/users/EmployeesList";
import { api } from "@/utils/api";
import { Heading } from "@radix-ui/themes";

import { type NextPage } from "next";

const UsersPage: NextPage = () => {
  const getEmployees = api.employee.getEmployees.useQuery();
  const { data } = getEmployees;

  return (
    <div className="mx-4 my-5 flex-col sm:mx-7 sm:my-7">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <Heading size="7">Users List</Heading>
        <CreateUserButton />
      </div>
      {data ? <EmployeesList data={data} /> : null}
    </div>
  );
};

export default UsersPage;
