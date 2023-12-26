import Documents from '@/components/Documents'

async function fetchDocuments() {
    console.log("Fetching documents")
    const apiUrl = process.env.RAG_API_URL
    const res = await fetch(apiUrl + '/api/list_docs/', {
        headers: {
            "X-API-KEY": process.env.RAG_API_KEY!
        }
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Home() {

    const documents = await fetchDocuments()
    
    return (
        <main className="flex w-full min-h-screen p-8 md:p-24 md:pt-8 justify-center">
            <div className="w-full max-w-5xl text-sm">
                <Documents documents={documents.slice(0,1000)}></Documents>
            </div>
        </main>
    )
}