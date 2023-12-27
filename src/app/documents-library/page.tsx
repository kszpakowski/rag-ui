import Documents from '@/components/Documents'
import { DocumentModel } from '@/types'

interface DocumentDto {
    id: number
    body_id: number
    doc_name: string
    prod_code: string
    doc_title: string
    type_name: string
}

async function fetchDocuments(): Promise<DocumentModel[]> {
    console.log("Fetching documents")
    const apiUrl = process.env.RAG_API_URL
    const res = await fetch(apiUrl + '/documents/?limit=2000', {
        headers: {
            "X-API-KEY": process.env.RAG_API_KEY!
        }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const documents = await res.json() as DocumentDto[]

    return documents.map((d) => ({
        id: d.id,
        name: d.doc_name,
        title: d.doc_title,
        type: d.type_name,
    }))
}

export default async function Home() {

    const documents = await fetchDocuments()

    return (
        <div className="w-full max-w-5xl text-sm">
            <Documents documents={documents}></Documents>
        </div>
    )
}