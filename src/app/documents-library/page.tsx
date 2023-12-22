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
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <Documents documents={documents.slice(0,1000)}></Documents>
            </div>
        </main>
    )
}