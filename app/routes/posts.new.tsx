import { Form, redirect } from "@remix-run/react";
import { createPost } from "~/utils/post.services";
export async function loader() {
    return null
}

export default function NewPost() {
    return (
        <div className='m-6'>
            <h1 className='text-3xl text-center'>New Post Page</h1>
            <div>
                <Form id='new-post' method='post'>
                    <div>
                        <label>Title:
                            <input className='w-full border border-gray-500 px-2 py-1 text-lg rounded 'type='text' id='title' name='title' />
                        </label>
                    </div>
                    <div>
                        <label>Content:
                            <textarea cols={60} rows={6} id='title' name='title' />
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

export async function action({request}) {
    const formData = await request.formData()
    const title = formData.get('title')
    const content = formData.get('content')
    await createPost({title,content})
    return redirect('/posts')
}