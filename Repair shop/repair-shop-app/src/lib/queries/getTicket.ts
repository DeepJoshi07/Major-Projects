import { tickets } from "@/db/schema";
import { eq } from "drizzle-orm";
import {db} from '@/db'

export async function getTickets(id:number) {
    const ticket = await db.select().from(tickets).where(eq(tickets.id,id))
    return ticket[0]
}