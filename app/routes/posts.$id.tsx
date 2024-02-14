import { useLoaderData } from "@remix-run/react";
import { getPostById } from "~/utils/post.services";

export const loader = async ({params})=> {
    const { id } = params
    const post = await getPostById(parseInt(id))
    if(!post) {
        throw new Response('Not Found', { status: 404})
    }
    return { post }
}

export default  function PostById() {
    const { post } = useLoaderData()
    return (
        <div>
            <h1>{post.title}</h1>
            <hr />
            <div>
                <div>{post.content}</div>
            </div>
        </div>
    )
} 