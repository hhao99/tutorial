import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from '@remix-run/node';
import { Form, useLoaderData, redirect } from "@remix-run/react";
import invariant from 'tiny-invariant'
import { getPostById, updatePostById } from "~/utils/post.services";
export async function loader({params}:LoaderFunctionArgs) {
    invariant(params.id, 'Missing the post id params')
    const post = await getPostById(parseInt(params.id))
    if(!post) {
        throw new Response('Not Found', { status: 404})
    }
    return json({post})
}

export default function EditPost() {
    const { post } = useLoaderData<typeof loader>()
    return (
        <div className='m-6'>
            <h1 className='text-3xl text-center'>Edit Post Page</h1>
            <div>
                <Form id='edit-post' method='post'>
                    <div>
                        <input hidden id='id' defaultValue={post.id} />
                        <label>Title:
                            <input className='w-full border border-gray-500 px-2 py-1 text-lg rounded ' 
                            type='text' id='title' name='title' 
                            defaultValue={post.title}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Content:
                            <textarea cols={60} rows={6} id='title' name='title' defaultValue={post.content}/>
                        </label>
                    </div>
                    <div>
                        <button type='submit'>save</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export async function action({params, request}) {
    const id = parseInt(params.id)
    const formData = await request.formData()
    const title = formData.get('title')
    const content = formData.get('content')
    await updatePostById({id,title,content})
    return redirect('/posts')
}