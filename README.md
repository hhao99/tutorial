# Welcome to Remix Blog tutorial

please refer the official tutorial site [remix blog tutorial] (https://remix.run/docs/en/main/tutorials/blog)

# The first Route

The remix route is based on the react route package, and like the nextjs route, it will use the file based route mechanism to structure your web application routing table.

Add a new file to the ~/app/routes/posts.tsx

```javascript
# ~/app/routes/posts.tsx
export const loader  = async ()=> null
export default function PostsIndex() {
    return (
        <div>
            <h1> Post Page</h1>
        </div>
    )
}
```

Now you can start the application

```bash
pnpm dev
```
the app will start and you can see the server output 

```bash
> tutorial@ dev /Users/k1/repos/react/tutorial
> remix dev --manual
 💿  remix dev
 info  building...
 info  built (454ms)
[remix-serve] http://localhost:3000 (http://192.168.0.139:3000)
```


you can use browser to see the application now.

Open the browser and with url https://localhost:3000/posts, you can see the new added post page.

And we need to refector it with the sub-directory structure. Make a sub directory *posts* under ~/app/routes, and move posts.tsx to this sub directory, rename it to the index.tsx.

# Data Loading

You see that every remix page have a loader function, you must define a default loader function to make the page to work, and remix use it to load the data when the page was rendered.

Let's make the loader function to return some data and display on the page.

```javascript
// ~/app/routes/posts/index.tsx

import { useLoaderData } from "@remix-run/react"
const posts = [
    {
        title: 'first post'
    },
    {
        title: 'second post'
    }
]
export const loader = async ()=> {
    return {
        posts
    }
    
}

export default function PostIndex() {
    const { posts } = useLoaderData<typeof loader>()

    return (
        <div>
            <h1>Post page</h1>
            <div>
            { posts && posts.map( post=> (<h3>{post.title}</h3>))}
            </div>
        </div>
    )
}
```
