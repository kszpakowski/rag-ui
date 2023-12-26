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
  }, [searchString, selected, onlySelected, documents])

  const addDoc = (id: string) => {
    console.log("Adding document", id)

    const selected = localStorage.getItem(lsKey)
    console.log(selected)
    if (!selected) {
      localStorage.setItem(lsKey, JSON.stringify([id]))
      updateSelected()
    } else {
      const value = JSON.parse(selected) as string[]
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


  return (
    <div className="w-full">
      <div className="flex-col space-y-2">
        <p className="text-lg">Search</p>
        <input className="w-full text-black p-2 rounded" onChange={(e) => setSearchString(e.target.value)}></input>
        <div className="flex w-full justify-between items-center">
          <p>{docs.length} Documents</p>
          <div>
            <label htmlFor="selected">Only selected</label> <input id="selected" type="checkbox" onChange={(e) => setOnlySelected(e.target.checked ? true : false)} />
          </div>
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
