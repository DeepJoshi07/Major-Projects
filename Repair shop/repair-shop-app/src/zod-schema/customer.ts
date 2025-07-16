import {createInsertSchema,createSelectSchema} from 'drizzle-zod'
import { customers } from '@/db/schema'
import {z} from 'zod'


export const insertCustomerSchema = createInsertSchema(customers,{
    firstName:(schema) => schema.min(1,'first name is required'),
    lastName:(schema) => schema.min(1,'last name is required'),
    address1:(schema) => schema.min(1,'address is required'),
    city:(schema) => schema.min(1,'city is required'),
    state:(schema) => schema.length(2,'state must be of exactly 2 characters'),
    email:(schema) => schema.email('invalid email').trim(),
    zip:(schema) => schema.regex(/^\d{5}(-\d{4})?$/,'invalid zip code'),
    phone:(schema) => schema.regex(/^\d{3}-\d{3}-\d{4}$/,'invalid phone number format.'),
})

export const selectCustomerSchema = createSelectSchema(customers)

export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>

export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>
