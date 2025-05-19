import { NextResponse } from "next/server"

export async function GET() {
    const endpoint: string = process.env.AIRTABLE_AUTHORS_ENDPOINT!
    const token: string = process.env.AIRTABLE_TOKEN!

    if (!endpoint || !token) {
        return NextResponse.json({ error: "Missing Airtable API Configuration" }, { status: 500 })
    }

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        console.log(response);

        if (!response.ok) {
            console.error("Airtable API error:", response.status, response.statusText);
            return NextResponse.json({ error: "Error Fetching the data" }, { status: 500 })
        }

        const data = await response.json()
        return NextResponse.json({ data: data }, { status: 200 })
    } catch (error: any) {
        console.error("Server-side fetch error:", error);
        return NextResponse.json({ error: `Server-side Fetching error: ${error.message}` }, { status: 500 })

    }
}