import Blog from "@/lib/model/blog.model.js";
import connectDB from "@/lib/config/db";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import fs from 'fs'
const connect = async () => {
  await connectDB();
};

connect();

export async function GET(request) {
  const id = request.nextUrl.searchParams.get('id');
    console.log(id)
  if (id) {
    const blog = await Blog.findById(id);
    return NextResponse.json( blog );
  } else {
    const blogs = await Blog.find({});
    return NextResponse.json(blogs);
  }

}

export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByte = await image.arrayBuffer();
  const buffer = Buffer.from(imageByte);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imageUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    author: `${formData.get("author")}`,
    image: imageUrl,
    authorImg: `${formData.get("authorImg")}`,
    category: `${formData.get("category")}`,
  };
  await Blog.create(blogData);
  console.log("data saved");
  return NextResponse.json({ success: true, message: "Blog Added!" });
}

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await Blog.findById(id);
    fs.unlink(`/public${blog.image}`,()=>{})
    await Blog.findByIdAndDelete(id)
    return NextResponse.json({message:'blog has been deleted'})
}