
import { Link, useLoaderData } from "@remix-run/react"
export async function loader() {
    return null
}

export default function Layout({children}) {
    return (
        <div>
            <header className='flex justify-between m-6'>
                <h1 className='text-gray-600 text-3xl text-center'>Remix Blog Application</h1>
                <nav className='grid grid-cols-4 gap-2'>
                    <Link to='/'>Home</Link>
                    <Link to='/posts'>Post Page</Link>
                    <Link to='/posts/new'>New Post</Link>
                    <Link to='/about'>About</Link>
                </nav>
            </header>
            <hr />
            <main className='bg-gray-100 mx-6'>
                {children}
            </main>
            <footer className='absolute bottom-4 w-full text-center'>
                <p>&copy by Eric Hao hhao99@163.com</p>
            </footer>
        </div>
    )
}