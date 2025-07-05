export default async function ScheduledPostChecker() {
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backend_uri) throw new Error("Missing backend URI");

    try {
        await fetch(`${backend_uri}/api/updateScheduledPost`, {
            cache: 'no-store',
        });
    } catch (err) {
        console.error("Failed to update scheduled posts:", err);
    }

    return null;
}