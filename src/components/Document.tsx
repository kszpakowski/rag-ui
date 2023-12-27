import { DocumentModel } from "@/types"

interface DocumentProps {
    doc: DocumentModel,
    selected: boolean,
    onAdd: (id: number) => any,
    onRemove: (id: number) => any,
}

export default function Document(props: DocumentProps) {


    const { id, name, title, type } = props.doc
    const { selected, onAdd, onRemove } = props

    return (
        <div className="w-full border border-gray-300 p-4 rounded-xl backdrop-blur-2xl space-y-6">
            <p>{title}</p>
            <div className="flex justify-between">
                <div className="space-x-4">
                    <span className="border border-green-300 p-1 rounded">{name}</span>
                    <span className="border border-green-300 p-1 rounded">{type}</span>
                </div>
                <div>
                    {selected ?
                        <span className="border border-red-300 p-1 rounded cursor-pointer hover:bg-red-900" onClick={() => onRemove(id)}>Remove</span> :
                        <span className="border border-green-300 p-1 rounded cursor-pointer hover:bg-green-900" onClick={() => onAdd(id)}>Add</span>}
                </div>
            </div>
        </div>
    )

}