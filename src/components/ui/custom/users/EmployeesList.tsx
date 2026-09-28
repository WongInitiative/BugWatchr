"use client";

import { TextField } from "@radix-ui/themes";
import EmployeesListEntry from "@/components/ui/custom/users/EmployeesListEntry";
import { Search } from "lucide-react";
import { type employeesWithTicketsType } from "@/lib/prismaTypes";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

type EmployeesListProps = {
  data: employeesWithTicketsType[];
};

const EmployeesList = ({ data }: EmployeesListProps) => {
  const [dataToShow, setDataToShow] = useState(data);
  const [inputToSearch, setInputToSearch] = useState("");
  const getEmployeesByName = api.employee.getEmployeesByName.useQuery({
    input: inputToSearch,
  });

  useEffect(() => {
    const filteredData = getEmployeesByName?.data as employeesWithTicketsType[];
    if (inputToSearch?.length > 0) {
      setDataToShow(filteredData);
    } else {
      setDataToShow(data);
    }
  }, [data, inputToSearch, getEmployeesByName?.data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full sm:w-auto sm:self-end">
        <TextField.Root>
          <TextField.Slot>
            <Search size={16} />
          </TextField.Slot>
          <TextField.Input
            placeholder="Search users"
            onChange={(e) => setInputToSearch(e.target.value)}
          />
        </TextField.Root>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dataToShow?.map((employee) => (
          <EmployeesListEntry key={employee?.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;
