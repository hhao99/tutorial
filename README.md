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

# Data Loading with Prisma 

Now we need a database to store the post content. Prisma is a very popular ORM framework, we will use prisma to store the blog post in the database.

## prepare the prisma 
Add the prisma to the project
```bash
pnpm i -D prisma
pnpm prisma init --datasource-provider sqlite
```
Prisma will initialize the database environment and use the sqlite as the database backend, it will generate the .env file and ~/prisma directory, you can add model in the ~/prisma/schema.prisma 

```javascript

model Post {
  id Int @id @default(autoincrement())
  title String
  content String?
  published Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

and prisma can migrate the database model with command
```bash
pnpm prisma migrate dev --name 'blog post model'
```

## Prisma client
Add a new file to store all the prisma database client function and act as the service to do the database operation for the web application.

You can review the file in the ~/utils/post.services.ts
And prisma CRUD function, please refer the [prisma docs](https://www.prisma.io/docs/orm/prisma-client/queries/crud)

## Prisma studio
For the test purpose, we can use prisma studio to operate the data in the sqlite database.

```bash
pnpm prisma studio
➜  tutorial git:(master) ✗ pnpm prisma studio                           
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Prisma Studio is up on http://localhost:5555
```


