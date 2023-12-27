'use client'

import DocumentResponse from "@/components/DocumentResponse";
import { useState, useEffect } from "react";

const lsKey = 'selected-docs'
const prompt = "Jesteś konsultantem infolii. Odpowiadasz na pytania odnośnie dokumentów firmy ubezpieczeniowej. Zawsze odpowiadaj po polsku. Opisz w kilku zdaniach załączony dokument"

export default function AskPage() {

    const [selected, setSelected] = useState([])

    useEffect(() => {
        const selectedString = localStorage.getItem(lsKey)
        if (selectedString) {
            const sel = JSON.parse(selectedString)
            setSelected(sel)
        }
    }, [])


    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm space-y-8">
            <p>{prompt}</p>
            <div className="flex-column space-y-4">
                {
                    selected.map(id =>
                        <div key={id}>
                            <DocumentResponse docId={id} />
                        </div>)
                }
            </div>
        </div>
    )
}