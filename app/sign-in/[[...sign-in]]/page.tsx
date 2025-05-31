import { SignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

export default async function Page() {
    const user = await currentUser()
    if (user) {
        redirect('/')
    }
    return (
        <div className='flex items-center justify-center absolute left-0 right-0 mx-auto top-0 bottom-0 my-auto'>
            <SignIn />
        </div>
    )
}