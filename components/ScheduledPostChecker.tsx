'use client'
import { useEffect } from 'react'

function ScheduledPostChecker() {
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!backend_uri) throw new Error("Missing api endpoint")
    try {
        useEffect(() => {
            fetch(`${backend_uri}/api/updateScheduledPost`);
        }, []);
    } catch (error) {
        console.error(error)
    }

    return null;

}

export default ScheduledPostChecker