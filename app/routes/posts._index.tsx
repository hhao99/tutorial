
// ~/app/routes/posts/index.tsx

import { useLoaderData } from "@remix-run/react"

import { getAllPosts } from "~/utils/post.services"

export const loader = async ()=> {
    return {
        posts: await getAllPosts()
    }
    
}

const Item = ({item})=> {
    return (
        <div>
            <h3>{item.title}</h3>
        </div>
    )
}
export default function PostIndex() {
    const { posts } = useLoaderData<typeof loader>()

    return (
        <div>
            <h1>Post List</h1>
            <div>
            { posts && posts.map( post=> (<Item key={post.title} item={post} />)) }
            </div>
        </div>
    )
}