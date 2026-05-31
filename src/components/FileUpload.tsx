import { UploadIcon } from "lucide-react"
import { useState } from "react"

type FileUploadProps ={
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
    acceptedFiles?: string
}

export default function FileUpload ({onDrop, onUpload, error, acceptedFiles = ''}: FileUploadProps) {

    const [isDragged, setIsDragged] = useState(false)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        let event = e
        event.stopPropagation()
        event.preventDefault()
    }

    const handleDragStartEvent = (e: React.DragEvent<HTMLDivElement>) => {
        let event = e
        event.stopPropagation()
        setIsDragged(true)
    }

    const handleDragStopEvent = (e: React.DragEvent<HTMLDivElement>) => {
        let event = e
        event.stopPropagation()
        setIsDragged(false)
    }

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        let event = e
        event.stopPropagation()
        event.preventDefault()
        onDrop(e)
    }

    return (
        <>
            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md ring-2 ring-offset-10 ring-slate-200 hover:text-indigo-500">
                <div onDragEnter={handleDragStartEvent} onDragOver={handleDragOver} onDrop={handleFileDrop} onMouseEnter={handleDragStartEvent} onMouseLeave={handleDragStopEvent} onDragLeave={handleDragStopEvent} onDragEnd={handleDragStopEvent}>
                    <div className={`h-[400px] w-[400px] flex items-center justify-center rounded-lg border-2 border-dashed ${isDragged ? 'border-primary' : 'border-slate-300' }`}>
                        <div>
                            <div className="flex justify-center text-gray-600">
                                <UploadIcon size={80} />
                            </div>
                            <div className="mt-4 flex text-sm/6 text-gray-700">
                                <p><span className="font-medium">Click</span> or <span className="font-medium">Drag and Drop</span> to upload your SVG file</p>
                            </div>
                            <p className="text-xs text-gray-600 text-center">Up to 4MB</p>
                        </div>
                    </div>
                </div>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={onUpload} accept={acceptedFiles}/>
                {error && <p className="mt-2 text-red-500 text-xs text-center">{error}</p>}
            </label>
        </>
    )
}