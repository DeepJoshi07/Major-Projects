import React from 'react'
import { getCustomers } from '@/lib/queries/getCustomer'
import { BackButton } from '@/components/BackButton'
async function CustomerFormPage({searchParams,}:{
    searchParams:Promise<{[key:string]:string | undefined}>
}) {
    try {
        const {customerId} = await searchParams
        if(customerId){
            const customer = await getCustomers(parseInt(customerId))
            if(!customer){
                return (
                    <>
                        <h2 className='text-2xl mb-2'>Customer ID #{customerId} not found</h2>
                        <BackButton title='Go Back' variant='default'/>
                    </>
                )
            }
                console.log(customer)
        }else{

        }
    } catch (error) {
        if(error instanceof Error){
            throw error
        }
    }
}

export default CustomerFormPage
