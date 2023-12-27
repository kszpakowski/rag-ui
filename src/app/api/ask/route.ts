import { auth } from "@/auth"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const docId = request.nextUrl.searchParams.get('docId')
    const session = await auth()
    if (!session) {
        throw new Error('Unauthorized')
    }

    const apiUrl = process.env.RAG_API_URL
    const prompt = "Jesteś konsultantem infolii. Odpowiadasz na pytania odnośnie dokumentów firmy ubezpieczeniowej. Zawsze odpowiadaj po polsku. Opisz w kilku zdaniach załączony dokument"
    const uri = `${apiUrl}/documents/${docId}/ask?prompt=${encodeURIComponent(prompt)}`
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