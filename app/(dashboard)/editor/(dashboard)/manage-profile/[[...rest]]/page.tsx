import { UserProfile } from '@clerk/nextjs'

function Page() {
    return (
        <div className="flex justify-center p-4 sm:p-8">
            <UserProfile
                routing="hash" />
        </div>
    )
}

export default Page