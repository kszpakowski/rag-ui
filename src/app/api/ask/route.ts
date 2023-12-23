import { auth } from "@/auth"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    console.log("ask api start")
    const docId = request.nextUrl.searchParams.get('docId')
    const session = await auth()
    if (!session) {
        return {
            "error": "unauthorized"
        }
    }

    const apiUrl = process.env.RAG_API_URL
    const prompt = "Jesteś konsultantem infolii. Odpowiadasz na pytania odnośnie dokumentów firmy ubezpieczeniowej. Zawsze odpowiadaj po polsku. Opisz w kilku zdaniach załączony dokument"
    const uri = `${apiUrl}/api/ask?doc_id=${docId}&prompt=${encodeURIComponent(prompt)}`
    const res = await fetch(uri, {
        headers: {
            "X-API-KEY": process.env.RAG_API_KEY!
        }
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    return Response.json({ data })


}