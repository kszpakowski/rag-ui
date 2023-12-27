import { auth } from "@/auth"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const docId = request.nextUrl.searchParams.get('docId')
    const prompt = request.nextUrl.searchParams.get('prompt')

    console.log(prompt)
    const session = await auth()
    if (!session) {
        throw new Error('Unauthorized')
    }

    const apiUrl = process.env.RAG_API_URL
    const uri = `${apiUrl}/documents/${docId}/ask?prompt=${encodeURIComponent(prompt!)}`
    const res = await fetch(uri, {
        method: 'POST',
        headers: {
            "X-API-KEY": process.env.RAG_API_KEY!
        }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    return Response.json(data)


}