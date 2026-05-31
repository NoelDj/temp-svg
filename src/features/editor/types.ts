import {fabric} from "fabric"
import { ITextboxOptions } from "fabric/fabric-impl"

export type ActiveTool =
    | "select"
    | "shapes"
    | "text"
    | "images"
    | "draw"
    | "fill"
    | "stroke-color"
    | "stroke-width"
    | "font"
    | "opacity"
    | "filter"
    | "settings"
    | "ai"
    | "remove-bg"
    | "templates"
    | "brand"
    | "svg"
    | "upload"

export type BuildEditorProps = {
    autoZoom: () => void
    copy: () => void
    paste: () => void
    canvas: fabric.Canvas
    fillColor: string
    strokeColor: string
    strokeWidth: number
    selectedObjects: fabric.Object[]
    setFillColor: (value: string) => void
    setStrokeColor: (value: string) => void
    setStrokeWidth: (value: number) => void
    strokeDashArray: number[]
    setStrokeDashArray: (value: number[]) => void
    fontFamily: string
    setFontFamily: (value: string) => void
    undo: () => void
    redo: () => void
    save: (skip?: boolean) => void
    canUndo: () => boolean
    canRedo: () => boolean
}

export type ColorObject = {
    originalColor: string
    colorValue: string
}

export type FileFormat = 'png' | 'jpg' | 'svg' | 'bmp' | 'json'

export type Editor = {
    saveAsFile: (fileFormat: FileFormat) => void
    loadJson: (json: string) => void
    saveAsJson: () => void
    onCopy: () => void
    onPaste: () => void
    addText: (value: string, options?: ITextboxOptions) => void
    changeOpacity: (value: number) => void
    getActiveOpacity: () => number
    bringForward: () => void
    bringBackwards: () => void
    changeStrokeWidth: (value: number) => void
    changeFillColor: (value: string) => void
    changeStrokeColor: (value: string) => void
    changeStrokeDashArray: (value: number[]) => void
    addCircle: () => void
    addSoftRectangle: () => void
    addRectangle: () => void
    addTriangle: () => void
    addInverseTriangle: () => void
    addDiamond: () => void
    addPentagon: () => void
    addStar: () => void
    getActiveFillColor: () => string
    getActiveFontWeight: () => number
    getActiveStrokeColor: () => string
    getActiveStrokeWidth: () => number
    getActiveStrokeDashArray: () => number[]
    getActiveFontStyle: () => string
    canvas: fabric.Canvas
    selectedObjects: fabric.Object[]
    getActiveFontFamily: () => string
    changeFontFamily: (value: string) => void
    changeFontWeight: (value: number) => void
    changeFontStyle: (value: string) => void
    changeLinethrough: (value: boolean) => void
    getActiveFontLinethrough: () => boolean
    changeUnderline: (value: boolean) => void
    getActiveFontUnderline: () => boolean
    getActiveSvgColors: () => DetectedColors
    replaceActiveSvgColors: (originalColor: string, newColor: string, property: 'Fill' | 'Stroke') => void
    applyColorpaletteToSvg: (palette: string[]) => void
    resetSvgColors: () => DetectedColors
    deleteActiveObjects: () => void
    changeTextAlign: (value: string) => void
    getActiveTextAlign: () => string
    changeFontSize: (value: number) => void
    getActiveFontSize: () => number
    addImage: (value: string) => void
    addSVG: (value: string) => void
    addSvgFromString: (value: string) => void
    changeImageFilter: (value: string) => void
    enableDrawingMode: () => void
    disableDrawingMode: () => void
    getWorkspace: () => fabric.Object | undefined
    changeBackground: (value: string) => void
    changeSize: (value: { width: number, height: number }) => void
    autoZoom: () => void
    zoomIn: () => void
    zoomOut: () => void
    onUndo: () => void
    onRedo: () => void
    canUndo: () => boolean
    canRedo: () => boolean
    ungroup: () => void
    exportAsSvg: () => void
}

export interface EditorHookProps {
    defaultState?: string
    defaultWidth?: number
    defaultHeight?: number
    clearSelectionCallback?: () => void
    initialCanvasImageFile?: CanvasImageFileData
    saveCallback?: (values: {
        json: string
        height: number
        width: number
    }) => void
}

export type ArrowKeys = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

export type FillColors = {
    originalFillColor: string
    activeFillColor: string
}

export type StrokeColors = {
    originalStrokeColor: string
    activeStrokeColor: string
}

export type ObjectColors = FillColors & StrokeColors

export type DetectedColors = (
    | FillColors
    | StrokeColors
    | ObjectColors
)[]

export type ColorToApply = {
    fill?: string,
    activeFillColor?: string,
    stroke?: string,
    activeStrokeColor?: string
}

export type CanvasImageFileData = {
    width: number
    height: number
    fileType: 'svg'
    content: string
    name?: string
}