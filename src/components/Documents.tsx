'use client'

import Document from "@/components/Document"
import { DocumentModel } from "@/types"
import { useEffect, useState } from "react"

interface DocumentsProps {
  documents: DocumentModel[]
}

const lsKey = 'selected-docs'

export default function Documents(props: DocumentsProps) {

  const { documents } = props

  const [docs, setDocs] = useState(documents)
  const [searchString, setSearchString] = useState('')
  const [selected, setSelected] = useState([])
  const [onlySelected, setOnlySelected] = useState(false)

  const updateSelected = () => {
    const selectedString = localStorage.getItem(lsKey)
    if (selectedString) {
      const sel = JSON.parse(selectedString)
      setSelected(sel)
    }
  }

  useEffect(() => {
    updateSelected()
  }, [])

  useEffect(() => {
    console.log("Setting docs", searchString)
    const filtered = documents.filter(d => 
      d.name.toLowerCase().includes(searchString.toLowerCase()) && (!onlySelected || selected.some(x => x === d.id)))
      setDocs(filtered)
  }, [searchString, selected, onlySelected])

  const addDoc = (id: string) => {
    console.log("Adding document", id)

    const selected = localStorage.getItem(lsKey)
    console.log(selected)
    if (!selected) {
      localStorage.setItem(lsKey, JSON.stringify([id]))
      updateSelected()
    } else {
      const value = JSON.parse(selected)
      if (!value.some(v => v === id)) {
        value.push(id)
        localStorage.setItem(lsKey, JSON.stringify(value))
        updateSelected()
      }
    }
  }

  const removeDoc = (id: string) => {
    console.log("Removing document", id)

    const selected = localStorage.getItem(lsKey)
    if (selected) {
      const value = JSON.parse(selected) as string[]
      localStorage.setItem(lsKey, JSON.stringify(value.filter(selectedId => selectedId !== id)))
      updateSelected()
    }
  }


  // TODO improve filters layout
  return (
    <div className="w-full">
      <div className="flex-col space-y-4">
        <div className="flex w-full justify-between align-middle">
          <div>
            <p className="text-lg">{docs.length} Documents</p>
          </div>
          <div className="space-x-2">
            <span>Search</span>
            <input className="text-black p-2 rounded" onChange={(e) => setSearchString(e.target.value)}></input>
          </div>
        </div>
        <div>
          Only Selected <input type="checkbox" onChange={(e) => setOnlySelected(e.target.checked ? true : false)} />
        </div>
      </div>
      <div className="flex-col space-y-4 mt-4">
        {
          docs.map(d =>
          (<div key={d.id}>
            <Document doc={d} selected={selected.some((x) => x === d.id)} onAdd={(id) => addDoc(id)} onRemove={(id) => removeDoc(id)}></Document>
          </div>
          ))
        }
      </div>
    </div>
  )
}
