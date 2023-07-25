import prisma from "@/app/libs/db";
import { NextResponse } from "next/server";

// Create a data
export const POST = async (req) => {
    try {
        const body = await req.json();
        const { title, desc } = body;

    const newPost = await prisma.post.create({
        data: {
            title: title,
            desc: desc,
        }
    });
    
    return NextResponse.json(newPost);

} catch (error) {
    return NextResponse.json({message: 'Post Error', error}, {status: 500})  
    }
}


// Read all data
export const GET = async () => {
    try {
        const allPosts = await prisma.post.findMany();
        
        return NextResponse.json(allPosts);

    } catch (error) {
        return NextResponse.json({message: 'Get Error', error}, {status: 500})  
    }
}


// Delete all data
export const DELETE = async () => {
    try {

        await prisma.post.deleteMany();

        return NextResponse.json('All Post is deleted !');
    } catch (error) {
        return NextResponse.json({message: 'Delete Error', error}, {status: 500})  
    }
}
