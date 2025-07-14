import connectDB from "@/lib/config/db";
import Email from "@/lib/model/email.model.js";
import { NextResponse } from "next/server";


const connect = async () => {
  await connectDB();
};

connect();

export async function POST(request){
    const formData = await request.formData();
    const emailData = {
        email:`${formData.get('email')}`
    }
    await Email.create(emailData);
    return NextResponse.json({message:'Email Added',success:true})
}

export async function GET(request){
    const emails = await Email.find({})

    return NextResponse.json({emails})
}


export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id')
    await Email.findByIdAndDelete(id)

    return NextResponse.json({success:true, message:'email has been deleted'})
}