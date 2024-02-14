import { PrismaClient } from '@prisma/client'
import type { Post } from '@prisma/client'
const prisma = new PrismaClient()

export async function getAllPosts(): Promise<[Post]> {
    return await prisma.post.findMany({})
}

export async function getPostById(id): Promise<Post>{
    return await prisma.post.findUnique({
        where: {
            id
        }
    })
}

export async function createPost(
    post: Pick<Post, "title"|'content'>
): Promise<Post> {
    return await prisma.post.create( {data: post})
}

export async function updatePostById(
    post: Pick<Post, 'id'|'title'|'content'>
): Promise<Post>{
    return await prisma.post.update({
            where: { id: post.id},
            data: {
                title: post.title,
                content: post.content
            }
        })
}