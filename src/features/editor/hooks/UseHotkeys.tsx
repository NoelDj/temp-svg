import { fabric } from "fabric"
import { useEvent } from "react-use"
import { ArrowKeys } from "../types"
import { calculateActiveobjectPosition } from "../utils"
import { useEffect } from "react"

interface UseHotkeysProps {
    canvas: fabric.Canvas | null
    undo: () => void
    redo: () => void
    save: (skip?: boolean) => void
    copy: () => void
    paste: () => void
}

export const useHotkeys = ({
    canvas,
    undo,
    redo,
    save,
    copy,
    paste
}: UseHotkeysProps) => {

    useEvent("keydown", (event) => {
        const isCtrlKey = event.ctrlKey || event.metaKey
        const isBackspace = event.key === "Backspace" || event.key === "Delete"

        const isInput = ["INPUT", "TEXTAREA"].includes(
            (event.target as HTMLElement).tagName,
        )

        if (isInput) return

        if (isBackspace) {
            canvas?.remove(...canvas.getActiveObjects())
            canvas?.discardActiveObject()
        }

        const arrowKeys:ArrowKeys[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        if (arrowKeys.includes(event.key)) {
            event.preventDefault()
            
            const activeObject = canvas?.getActiveObject()
            if (!activeObject || !canvas) return

            const step = event.shiftKey ? 20 : 1;

            activeObject.set(calculateActiveobjectPosition(event.key, activeObject, step))

            save()
            canvas.renderAll()
        }

        if (isCtrlKey && event.key === "z") {
            event.preventDefault()
            undo()
        }

        if (isCtrlKey && event.key === "y") {
            event.preventDefault()
            redo()
        }

        if (isCtrlKey && event.key === "c") {
            event.preventDefault()
            copy()
        }

        if (isCtrlKey && event.key === "v") {
            event.preventDefault()
            paste()
        }

        if (isCtrlKey && event.key === "s") {
            event.preventDefault()
            save(true)
        }

        if (isCtrlKey && event.key === "a") {
            event.preventDefault()
            canvas?.discardActiveObject()

            const allObjects = canvas?.getObjects()
                .filter((object) => object.selectable)

            canvas?.setActiveObject(
                new fabric.ActiveSelection(allObjects, { canvas })
            )
            canvas?.renderAll()
        }
    })
}