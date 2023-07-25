import prisma from "@/app/libs/db"
import { NextResponse } from "next/server";

// Helper function to parse id from pathname
function parseId(pathname) {
    const parts = pathname.split('/');
    return parts[parts.length - 1];
}

// Retrieve a data
export const GET = async (req) => {
    try {
        const id = parseId(req.nextUrl.pathname);

        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        return NextResponse.json(post);

    } catch (error) {
        return NextResponse.json({message: 'Get Error', error}, {status: 500})  
    }
};

// Update a data
export const PATCH = async (req) => {
    try {
        const body = await req.json();
        const { title, desc } = body;

        const id = parseId(req.nextUrl.pathname);

        const updatedPost = await prisma.post.update({
            where: {
                id: Number(id)
            },
            data: {
                title: title,
                desc: desc
            }
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({message: 'Update Error', error}, {status: 500})  
    }
}


// Delete a data
export const DELETE = async (req) => {
    try {
        const id = parseId(req.nextUrl.pathname);

        await prisma.post.delete({
            where: {
                id: Number(id)
            }
        })

        return NextResponse.json('Post is deleted !');
    } catch (error) {
        return NextResponse.json({message: 'Delete Error', error}, {status: 500})  
    }
}
