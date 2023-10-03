import { Prisma } from "@prisma/client";

//need to manually recreate usersWithTickets type bc prisma does not include relations by default
const employeesWithTicketsRelation = Prisma.validator<Prisma.EmployeeArgs>()({
  include: { tickets: true },
});

//exporting type bc ListEntry needs it
export type employeesWithTicketsType = Prisma.EmployeeGetPayload<
  typeof employeesWithTicketsRelation
>;

//need to manually recreate ticketsWithEmployeeAssigned type bc prisma does not include relations by default
const ticketWithEmployeeRelation = Prisma.validator<Prisma.TicketArgs>()({
  include: { employee: true },
});

//exporting type bc ListEntry needs it
export type ticketWithEmployeeType = Prisma.TicketGetPayload<
  typeof ticketWithEmployeeRelation
>;
