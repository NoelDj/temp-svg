"use client"

import Editor from '@/features/editor/components/Editor'
import { useState } from 'react'
import FileUpload from './FileUpload'
import { ActiveTool, CanvasImageFileData } from '@/features/editor/types'



function EditorWrapper() {
    const [initalSvgString, setInitialSvgString] = useState<CanvasImageFileData | null>(null)
    const [initialTool, setInitialTool] = useState<ActiveTool>('svg')
    const [error, setError] = useState('')

    async function handleValidatedFile(file: File) {
        const contentString = await readCurrentFile(file)

        const imageData: CanvasImageFileData = {
            content: contentString,
            height: 1920,
            width: 1080,
            fileType: 'svg',
            name: 'file'
        }

        const match = contentString.match(/width\s*=\s*"(\d+)(?:px)?".*height\s*=\s*"(\d+)(?:px)?"/)

        if (match) {
            imageData.width = parseInt(match[1], 10)
            imageData.height = parseInt(match[2], 10)
        } else if (!match) {
            const viewBoxMatch = contentString.match(
                /viewBox\s*=\s*["']\s*([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s*["']/
            )

            if (viewBoxMatch) {
                const vbWidth = parseFloat(viewBoxMatch[3])
                const vbHeight = parseFloat(viewBoxMatch[4])

                imageData.width = vbWidth
                imageData.height = vbHeight
            }
        }

        const domSVG = new DOMParser().parseFromString(contentString, 'text/html').body.querySelector('svg')
        if (domSVG?.children.length === 1) {
            const isPath = domSVG?.firstElementChild?.tagName === 'path'
            if (isPath) setInitialTool('fill')       
        }

        setInitialSvgString(imageData)
    }

    function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files

        if (!files || files.length !== 1) {
            setError('Only one file allowed')
            return
        }

        const currentFile = files[0]

        if (!currentFile) {
            setError('Invalid file')
            return
        }
        
        if (!validateFileType(currentFile)) {
            setError('Invalid file')
            return
        }
        
        handleValidatedFile(currentFile)
    }



    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        const event = e
        const items = event.dataTransfer?.items || event.dataTransfer?.files

        if (!items || items.length !== 1) {
            setError('Only one file allowed')
            return
        }

        const item = items[0];

        if (item.kind !== "file") {
            setError('Invalid file')
            return
        }

        const file = item.getAsFile()

        if (!file) {
            setError('Invalid file')
            return
        }

        if (!validateFileType(file)) {
            setError('Invalid file')
            return
        }

        handleValidatedFile(file)
    }

    return (
        <>
            { !initalSvgString && 
                <div className='h-[650px] border rounded-xl border-slate-200 flex items-center justify-center shadow-custom' >
                    <FileUpload 
                        onUpload={handleUpload}
                        onDrop={handleDrop}
                        error={error}
                        acceptedFiles='image/svg+xml'
                    />
                </div>
            }
            {
                initalSvgString && <Editor initialCanvasImageFile={initalSvgString} initialTool={initialTool} />
            }
        </>
    )
}

//h-[749px]

export default EditorWrapper

const readCurrentFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            if (reader.result && typeof reader.result === 'string') {
                resolve(reader.result)
            } else {
                reject()
            }
        })
        reader.readAsText(file)
    })
}

const validateFileType = (file: File) => {

    const fileTypes = [
        "image/svg+xml"
        // "image/apng",
        // "image/bmp",
        // "image/gif",
        // "image/jpeg",
        // "image/pjpeg",
        // "image/png",
        // "image/tiff",
        // "image/webp",
        // "image/x-icon",
    ]

    return fileTypes.includes(file.type)
}