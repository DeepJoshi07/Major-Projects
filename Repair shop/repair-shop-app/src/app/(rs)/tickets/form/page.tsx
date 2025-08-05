import { getCustomers } from "@/lib/queries/getCustomer";
import { getTickets } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/BackButton";
import TicketForm from "./TicketForm";

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID #{customerId} is required to load ticket
            form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }
    if (customerId) {
      const customer = await getCustomers(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      if(!customer.active){
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
    }
    if(ticketId){
        const ticket = await getTickets(parseInt(ticketId))

        if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Ticket ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
       const customer = await getCustomers(ticket.customerId)
       
       
       console.log('ticket :', ticket)
       console.log('customer :', customer)
       return(<TicketForm  customer={customer}/>)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
