import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import { generateClientDropzoneAccept, generatePermittedFileTypes } from "uploadthing/client";
import { useUploadThing } from "../hooks/UseUploadThing";
import { Editor } from "../types";
import { Loader, UploadIcon } from "lucide-react";
import { SpinnerIcon } from "@phosphor-icons/react";

type MultiUploaderProps = {
    editor: Editor | undefined;
}

export function MultiUploader({editor}: MultiUploaderProps) {
    const [error, setError] = useState<string | null>(null)
    const [isDragged, setIsDragged] = useState(false)

    const onDrop = useCallback((files: File[]) => {

        if (!files || files.length === 0) {
            setError('Invalid file')
            return
        }

        if (files.length > 1) {
            console.log(files.length)
            setError('Only 1 file is allowed')
            return
        }
    
        const currentFile = files[0]

        if (!currentFile || !(currentFile instanceof File)) {
            setError('Invalid file')
            return
        }
        
        if (!validateFileType(currentFile)) {
            setError('File type not allowed')
            return
        }

        setError(null)
        if (currentFile.type === "image/svg+xml") {
            handleSvgFile(currentFile)
        } else {
            startUpload([currentFile])
        }
    }, [editor])

    async function handleSvgFile(file: File) {
        const contentString = await readCurrentFile(file)
        editor?.addSvgFromString(contentString)
    }

    const { startUpload, routeConfig, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            editor?.addImage(res[0].ufsUrl)
        },
        onUploadError: (e) => {
            setError("Error occured while uploading")
        },
        // onUploadBegin: (file) => {
        //     console.log(file)
        //     console.log("upload has begun for", file)
        // },
    })


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
        ...generateClientDropzoneAccept(
            generatePermittedFileTypes(routeConfig).fileTypes,
            ),
            "image/svg+xml": [".svg"],
        },
    })

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

    if (isUploading) {
        return (
            <div className='h-[190px] w-[100%] flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 mt-2 flex-col gap-x-6'>
                <Loader className="size-6 animate-spin text-muted-foreground text-primary" />
                <p>Uploading file</p>
            </div>
        )
    }

    return (
        <div className="mt-2">
             <div {...getRootProps()} onDragEnter={handleDragStartEvent} onDragOver={handleDragOver} onMouseEnter={handleDragStartEvent} onMouseLeave={handleDragStopEvent} onDragLeave={handleDragStopEvent} onDragEnd={handleDragStopEvent}>
                <input {...getInputProps()} />
                <div className={`h-[190px] w-[100%] cursor-pointer flex items-center justify-center rounded-lg border-2 border-dashed ${isDragged ? 'border-primary' : 'border-slate-300' }`}>
                    <div>
                        <div className="flex justify-center text-gray-600">
                            <UploadIcon size={50} />
                        </div>
                        <div className="mt-4 flex text-sm/6 text-gray-700">
                            <p><span className="font-medium">Click</span> or <span className="font-medium">Drag and drop</span> to upload your Svg</p>
                        </div>
                        <p className="text-xs text-gray-600 text-center">Accepts both images and SVGs</p>
                    </div>
                </div>
            </div>
            {error && <p className="mt-2 text-red-500 text-xs text-center">{error}</p>}
        </div>
    )
}

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
        "image/svg+xml",
        // "image/apng",
        "image/bmp",
        "image/webp",
        "image/gif",
        "image/jpeg",
        "image/jpg",
        // "image/pjpeg",
        "image/png",
        // "image/tiff",
        // "image/webp",
        // "image/x-icon",
    ]

    return fileTypes.includes(file.type)
}