"use client"

import { fabric } from 'fabric'; // browser
import { useCallback, useEffect, useRef, useState } from "react"
import UseEditor from "../hooks/UseEditor"
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Footer from './Footer';
import { ActiveTool, CanvasImageFileData } from '../types';
import ShapeSidebar from './ShapeSidebar';
import FillColorSidebar from './FillColorSidebar';
import { selectionDependantTools } from '../contstants/constants';
import StrokeColorSidebar from './StrokeColorSidebar';
import StrokeWidthSidebar from './StrokeWidthSidebar';
import OpacitySidebar from './OpacitySidebar';
import TextSidebar from './TextSidebar';
import BrandSidebar from './BrandSidebar';
import FontSidebar from './FontSidebar';
import SvgFillSidebar from './SvgFillSidebar';
import ImageSidebar from './ImageSidebar';
import ImageFilterSidebar from './FilterImageSidebar';
import DrawSidebar from './DrawSidebar';
import SettingsSidebar from './SettingsSidebar';
import UploadImageSidebar from './UploadImageSidebar';
import { ResponseType } from '@/features/dashboard/api/UseGetProject';
import debounce from 'lodash.debounce';
import { UseUpdateProject } from '@/features/dashboard/api/UseUpdateProject';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';
 






interface EditorProps {
    initialData?: ResponseType["data"]
    initialCanvasImageFile?: CanvasImageFileData
    initialTool?: ActiveTool 
}

export default function Editor({ initialData, initialCanvasImageFile, initialTool }: EditorProps) {

    const session = useSession()
    const isAuthenticated = session?.status === "authenticated"

    const {
        height = 1080,
        width = 1920,
        json = '',
        id = '',
        name = 'Untitled project',
        ...rest
    } = initialData ?? {}


    const { mutate } = UseUpdateProject(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSave = useCallback(
        debounce(
            (values: { 
                json: string,
                height: number,
                width: number,
            }) => {
            mutate(values);
        },
        1500
    ), [mutate])
    
    const saveCallback = isAuthenticated ? debouncedSave : undefined

    const [activeTool, setActiveTool] = useState<ActiveTool>(initialTool ?? "shapes")

    const onChangeActiveTool = useCallback((tool: ActiveTool) => {
        
        if (tool === "draw") {
            editor?.enableDrawingMode()
        }
        
        if (activeTool === "draw") {
            editor?.disableDrawingMode()
        }
        
        if (tool === activeTool) {
            return setActiveTool("select");
        }
        setActiveTool(tool);
    }, [activeTool])

    const onClearSelection = useCallback(() => {
        if (selectionDependantTools.includes(activeTool)) {
            setActiveTool('select')
        }
    }, [activeTool])

    const { init, editor } = UseEditor({
        defaultState: json,
        defaultWidth: width,
        defaultHeight: height,
        clearSelectionCallback: onClearSelection,
        saveCallback,
        initialCanvasImageFile
    })

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return

        const canvas = new fabric.Canvas(
            canvasRef.current,
            {
                controlsAboveOverlay: true,
                preserveObjectStacking: true
            }
        )

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current
        })

        return () => {
            canvas?.dispose()
        }     
    }, [init])

    return (
        <div className="h-full flex flex-col border">
            <div className='bg-white flex-1 rounded-2xl flex flex-col shadow-md'>
                <Navbar
                    id={id}
                    name={name}
                    isAuthenticated={isAuthenticated}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                    editor={editor}
                />
                <div className='w-full flex flex-1 min-h-0'>
                    <Sidebar
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <ShapeSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <FillColorSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <StrokeColorSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <StrokeWidthSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <OpacitySidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <TextSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <FontSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <BrandSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <SvgFillSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <ImageSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <UploadImageSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <ImageFilterSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <DrawSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <SettingsSidebar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <main className='flex-1 overflow-auto relative flex flex-col'>
                        <Toolbar
                            editor={editor}
                            activeTool={activeTool}
                            onChangeActiveTool={onChangeActiveTool}
                            key={JSON.stringify(editor?.canvas.getActiveObject())}
                        />
                        <div className="flex-1 min-h-0 bg-slate-300" ref={containerRef}>
                            <canvas ref={canvasRef}/>
                        </div>
                        <Footer editor={editor}/>
                    </main>
                </div>
            </div>

        </div>
    )
}

