'use client'

import DocumentResponse from "@/components/DocumentResponse";
import { useState, useEffect, useRef } from "react";

const lsKey = 'selected-docs'
const defaultPrompt = "Jesteś konsultantem infolii. Odpowiadasz na pytania odnośnie dokumentów firmy ubezpieczeniowej. Zawsze odpowiadaj po polsku. Opisz w kilku zdaniach załączony dokument"

export default function AskPage() {



    const [selected, setSelected] = useState([])
    const [history, setHistory] = useState([] as string[])
    const [prompt, setPrompt] = useState(defaultPrompt)
    const [newPrompt, setNewPrompt] = useState("")
    const [historyVisible, setHistoryVisible] = useState(false)
    const inputRef = useRef(null);


    useEffect(() => {
        const selectedString = localStorage.getItem(lsKey)
        if (selectedString) {
            const sel = JSON.parse(selectedString)
            setSelected(sel)
        }
        const promptsString = localStorage.getItem('history')

        if (promptsString) {
            const prompts = JSON.parse(promptsString)
            setHistory(prompts)
        }


    }, [])

    const updatePrompt = () => {
        history.push(newPrompt)

        localStorage.setItem('history', JSON.stringify(history.slice(-15)))

        setPrompt(newPrompt)
    }


    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm space-y-8">
            <p>{prompt}</p>
            <div className="w-full flex gap-2">
                <input ref={inputRef} type="text" className="text-black grow" onChange={(v) => setNewPrompt(v.target.value)}></input>
                <button className="hover:bg-green-900" onClick={() => setHistoryVisible(true)}>History</button>
                <button className="hover:bg-green-900" onClick={() => { updatePrompt() }}>Ask</button>
            </div>
            {
                historyVisible &&
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <p>History</p>
                        <button className="hover:bg-red-900" onClick={() => setHistoryVisible(false)}>X</button>
                    </div>
                    <ul>
                        {history.map(p => <>
                            <li>
                                <div className="flex justify-between gap-2 border-b hover:bg-green-900">
                                    <p className="grow">{p}</p>
                                    <button onClick={() => { console.log('remove') }}>Remove</button>
                                    <button onClick={() => { (inputRef.current! as any).value = p; setNewPrompt(p) }}>Use</button>
                                </div>
                            </li>
                        </>)}
                    </ul>
                </div>
            }
            <div className="flex-column space-y-4">
                {
                    selected.map(id =>
                        <div key={id}>
                            <DocumentResponse docId={id} prompt={prompt} />
                        </div>)
                }
            </div>
        </div>
    )
}