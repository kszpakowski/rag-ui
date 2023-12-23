'use client'

import { useEffect, useState } from "react"

interface DocumentResponseProps {
    docId: string
}

interface ResponseModel {
    metadata: any,
    response: string

}

export default function DocumentResponse(props: DocumentResponseProps) {

    const [response, setResponse] = useState({} as ResponseModel)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log('Fetching doc')
        setLoading(true)
        fetch(`/api/ask?docId=${props.docId}`).then(res => res.json())
            .then(res => res.data)
            .then(setResponse)
            .then(() => setLoading(false))
    }, [props.docId])

    const getMetadata = () => {
        if (response) {
            console.log(response)
            if (response.metadata) {
                return Object.values(response.metadata)[0].name as string
            }
        }
        return "x"
    }

    return <div className="border border-gray-300 p-4 rounded-xl">

        {
            loading ? <p>loading...</p> :
                <div className="space-y-4">
                    <p className="text-xl">{getMetadata()}</p>
                    <p>{response.response}</p>
                </div>
        }

    </div>
}