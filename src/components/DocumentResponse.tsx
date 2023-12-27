'use client'

import { useEffect, useState } from "react"

interface DocumentResponseProps {
    docId: number
}

interface QuestionDto {
    id: number,
    question: string,
    answer: string,
    status: string,
    document: {
        id: number
        body_id: number
        doc_name: string
        prod_code: string
        doc_title: string
        type_name: string
    }

}

export default function DocumentResponse(props: DocumentResponseProps) {

    const [response, setResponse] = useState({} as QuestionDto)

    const fetchData = async (docId: number) => {
        const res = await fetch(`/api/ask?docId=${docId}`)
        if (!res.ok) {
            throw new Error(`Failed to fetch data - ${res.status}`)
        }
        return await res.json()
    }

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (!response.answer) {
                const data = await fetchData(props.docId)
                setResponse(data)
            }
        }, 3000)
        return () => clearInterval(intervalId);
    }, [props.docId, response])

    useEffect(() => {
        fetchData(props.docId).then(setResponse)
    }, [props.docId])

    return <div className="border border-gray-300 p-4 rounded-xl min-h-500">
        <div className="space-y-4">
            {response.document && <>
                <p className="text-lg">{response.document.doc_title}</p>
                {response.answer ? <p>{response.answer}</p> : <p>Waiting for response...</p>}
                <div className="flex flex-wrap gap-2">
                    <p className="border border-green-300 p-1 rounded">{response.document.doc_name}</p>
                    <p className="border border-green-300 p-1 rounded">{response.document.prod_code}</p>
                    {response.status !== 'Answered' && <>
                        <p className="border border-green-300 p-1 rounded">Qid: {response.id}</p>
                        <p className="border border-green-300 p-1 rounded">{response.status}</p>
                    </>
                    }
                </div>
            </>}

        </div>
    </div>
}