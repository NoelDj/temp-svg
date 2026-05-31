import { useCallback, useState, useMemo, useEffect, useRef } from "react"
import { fabric } from 'fabric'
import { FabricObject, Group } from 'fabric/fabric-impl';
import useAutoResize from "./UseAutoResize"
import { BuildEditorProps, ColorObject, ColorToApply, DetectedColors, DetectedFill, DetectedStroke, Editor, EditorHookProps, FileFormat } from "../types"
import { CIRCLE_OPTIONS, DIAMOND_OPTIONS, FILL_COLOR, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, JSON_KEYS, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH, TEXT_OPTIONS, TRIANGLE_OPTIONS } from "../contstants/constants"
import { useCanvasEvents } from "./UseCanvasEvents"
import { createFilter, detectColorsFromObjects, downloadFile, getClosestColor, isObjectSvg, isTextType, transformText } from "../utils"
import chroma from "chroma-js"
import { ITextOptions } from "fabric/fabric-impl"
import { UseClipboard } from "./UseClipboard"
import UseHistory from "./UseHistory"
import { useHotkeys } from "./UseHotkeys"
import { useLoadState } from "./UseLoadState"
import { useWindowEvents } from "./UseWindowEvents";

declare module 'fabric/fabric-impl' {
    interface Object {
        originalFillColor?: string
        activeFillColor?: string
        originalStrokeColor?: string
        activeStrokeColor?: string
        originalColors?: DetectedColors
        originalSvgString?: string
        getObjects: () => Object[]
    }

    interface Group extends FabricObject {
        originalColors?: DetectedColors
    }
}

fabric.Object.prototype.toObject = (function (toObject) {
    return function (this: fabric.Object, propertiesToInclude = []) {
        return toObject.call(this, [
            ...propertiesToInclude,
            'originalColors',
            'originalFillColor',
            'activeFillColor',
            'originalStrokeColor',
            'activeStrokeColor',
            'originalSvgString'
        ])
    }
})(fabric.Object.prototype.toObject);

type InitialObjectType = 'svg' | 'img' | 'text'

type InitialObject = {
    type: InitialObjectType
    url: string
    content: string
    filename: string
}

type initialEditor = {
    initialCanvas: fabric.Canvas,
    initialContainer: HTMLDivElement
    initialObjects?: InitialObject[] | InitialObject
}

const buildEditor = ({
    save,
    undo,
    redo,
    canRedo,
    canUndo,
    canvas,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    selectedObjects,
    strokeDashArray,
    setStrokeDashArray,
    fontFamily,
    setFontFamily,
    copy,
    paste,
    autoZoom
}: BuildEditorProps): Editor => {
    function getWorkspace () {
        return canvas.getObjects().find((object) => object.name === "clip")
    }

    function center (object: fabric.Object) {
        const workspace = getWorkspace()
        const center = workspace?.getCenterPoint()

        if (!center) return

        // @ts-ignore
        canvas._centerObject(object, center)
    }

    function addToCanvas(object: fabric.Object) {
        center(object)
        canvas.add(object)
        canvas.setActiveObject(object)
    }

    function generateSaveOptions () {
        const { width, height, left, top } = getWorkspace() as fabric.Rect

        return {
            name: "Image",
            format: "png",
            quality: 1,
            width,
            height,
            left,
            top,
        }
    }

    return {
        exportAsSvg: () => {

            const svgCount = canvas.getObjects().reduce(((a, v) => {
                if (v.originalSvgString) {
                    return a + 1
                }
                return a
            }), 0)
            
            const {width, height} = generateSaveOptions()
            let result = ''
            
            if (svgCount === 1 && canvas._objects.length === 2) {
                const object = canvas.getObjects().find((o) => o.originalSvgString)

                if (!object) return
                
                const colors = object.originalColors
                result = object.originalSvgString as string

                colors?.forEach((color) => {
                    const newColor = color.activeFillColor || color.activeStrokeColor
                    const oldColor = color.originalFillColor || color.originalStrokeColor
                    
                    result = result.replaceAll(oldColor, newColor);
                })

                const dom = new DOMParser().parseFromString(result, 'text/html').body.children[0]
                
                dom.setAttribute('width', dom.getAttribute('width') || String(width))
                dom.setAttribute('height', dom.getAttribute('height') || String(height))

                result = dom.outerHTML
                
            } else {
                result = canvas.toSVG(
                    {
                        height,
                        width,
                        viewBox: {
                            x: 0,
                            y: 0,
                            height: height|| 1920,
                            width: width || 1080
                        }
                    }
                )
            }

            const fileInfo = 'image/svg+xml'
            const downloadContent = `data:${fileInfo},` + encodeURIComponent(result)
            downloadFile(downloadContent, 'svg')
            
        },
        saveAsFile: (fileFormat) => {
            const options = generateSaveOptions()
            canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
            const dataUrl = canvas.toDataURL(options)
            downloadFile(dataUrl, fileFormat)
            autoZoom()
        },
        loadJson: (json) => {
            const data = JSON.parse(json);

            canvas.loadFromJSON(data, () => {
                autoZoom()
            })
        },
        saveAsJson: async () => {
            const dataUrl = canvas.toJSON(JSON_KEYS)

            await transformText(dataUrl.objects)
            const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(dataUrl, null, "\t"),
            )}`

            downloadFile(fileString, "json")
        },
        ungroup: () => {
            const objects = canvas.getActiveObjects()
            objects.forEach((object) => {
                if (object.type === "group") {
                    object._restoreObjectsState()

                    // Remove the group itself
                    canvas.remove(object)

                    object.getObjects().forEach((item) => {
                        canvas.add(item)
                    })
                }
            })

            canvas.discardActiveObject()
            canvas.renderAll()
        },
        canUndo,
        canRedo,
        autoZoom,
        zoomIn: () => {
            let zoomRatio = canvas.getZoom()
            zoomRatio += 0.05
            const center = canvas.getCenter()
            canvas.zoomToPoint(
                new fabric.Point(center.left, center.top),
                zoomRatio > 1 ? 1 : zoomRatio
            )
            save()
        },
        zoomOut: () => {
            let zoomRatio = canvas.getZoom()
            zoomRatio -= 0.05
            const center = canvas.getCenter()
            canvas.zoomToPoint(
                new fabric.Point(center.left, center.top),
                zoomRatio < 0.2 ? 0.2 : zoomRatio,
            )
        },
        getWorkspace,
        changeSize: (value: { width: number, height: number }) => {
            const workspace = getWorkspace()

            workspace?.set(value)

            autoZoom()
            //canvas.getObjects().forEach(object => center(object))
        },
        changeBackground: (value: string) => {
            const workspace = getWorkspace()
            workspace?.set({ fill: value })
            canvas.renderAll()
            save()
        },
        enableDrawingMode: () => {
            canvas.discardActiveObject()
            canvas.renderAll()
            canvas.isDrawingMode = true
            canvas.freeDrawingBrush.width = strokeWidth
            canvas.freeDrawingBrush.color = strokeColor
        },
        disableDrawingMode: () => {
            canvas.isDrawingMode = false
        },
        onCopy: () => copy(),
        onPaste: () => paste(),
        deleteActiveObjects: () => {
            canvas.getActiveObjects().forEach(object => canvas.remove(object))
            canvas.discardActiveObject()
            canvas.renderAll()
        },
        changeImageFilter: (value: string) => {
            const objects = canvas.getActiveObjects()
            objects.forEach((object) => {
                if (object.type === "image") {
                    const imageObject = object as fabric.Image

                    const effect = createFilter(value)

                    imageObject.filters = effect ? [effect] : []
                    imageObject.applyFilters()
                    canvas.renderAll()
                }
            })
        },
        addImage: (value: string) => {
            fabric.Image.fromURL(
                value,
                (image) => {
                    const workspace = getWorkspace()

                    image.scaleToWidth(workspace?.width || 0)
                    image.scaleToHeight(workspace?.height || 0)

                    addToCanvas(image)
                },
                {
                    crossOrigin: "anonymous",
                },
            )
        },
        //here
        addSVG: async (url: string) => {

            const endpoint = url.trim()

            const svgString = await fetch(endpoint).then(svg => svg.text())

            fabric.loadSVGFromURL(endpoint,
                (objects, options) => {
                    const detectedColors = detectColorsFromObjects(objects)

                    const svg = fabric.util.groupSVGElements(objects, {...options})
                    
                    svg.set({
                        originalColors: detectedColors,
                        originalSvgString: svgString.trim(),
                    })

                    const workspace = getWorkspace()
                    svg.scaleToHeight((workspace?.height || 0) * 0.8)
                    addToCanvas(svg)
                },
                undefined,
                { crossOrigin: "anonymous" }
            )
        },
        addSvgFromString(string: string) {
            fabric.loadSVGFromString(string,
                (objects, options) => {
                    const detectedColors = detectColorsFromObjects(objects)

                    const svg = fabric.util.groupSVGElements(objects, {...options})
                    
                    svg.set({
                        originalColors: detectedColors,
                        originalSvgString: string
                    })
                    const workspace = getWorkspace()
                    svg.scaleToHeight((workspace?.height || 0) * 0.8)
                    addToCanvas(svg)
                }
            )
        },
        addText: (value, options) => {
            const object = new fabric.Textbox(value, {
                ...TEXT_OPTIONS,
                fill: fillColor,
                ...options
            })

            addToCanvas(object) 
        },
        getActiveFontWeight: () => {
            // @ts-ignore
            return selectedObjects[0]?.get('fontWeight') || FONT_WEIGHT
        },
        getActiveOpacity: () => {
            return selectedObjects[0]?.get('opacity') || 1
        },
        getActiveFontFamily: () => {
            // @ts-ignore
            return selectedObjects[0]?.get('fontFamily') || fontFamily
        },
        getActiveFontStyle: () => {
            // @ts-ignore
            return selectedObjects[0]?.get('fontStyle') || 'normal'
        },
        getActiveFontLinethrough: () => {
            // @ts-ignore
            return selectedObjects[0]?.get('linethrough') || 'normal'
        },
        getActiveTextAlign: () => {
            // @ts-ignore
            return selectedObjects[0]?.get('textAlign') || 'left'
        },
        // ITextOptions["textAlign"]
        changeFontSize: (value: number) => {
            canvas.getActiveObjects().forEach((object) => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({fontSize: value})
                }
            })
            canvas.renderAll()
        },
        getActiveFontSize: () => {
            // @ts-ignore
            return selectedObjects[0]?.get('fontSize') || FONT_SIZE
        },
        // ITextOptions["textAlign"]
        changeTextAlign: (value: string) => {
            canvas.getActiveObjects().forEach((object) => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({textAlign: value})
                }
            })
            canvas.renderAll()
        },
        changeLinethrough: (value: boolean) => {
            canvas.getActiveObjects().forEach((object) => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({linethrough: value})
                }
            })
            canvas.renderAll()
        },
        getActiveFontUnderline: () => {
            // @ts-ignore
            return selectedObjects[0]?.get('underline') || 'normal'
        },
        changeUnderline: (value: boolean) => {
            canvas.getActiveObjects().forEach((object) => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({underline: value})
                }
            })
            canvas.renderAll()
        },
        changeFontStyle: (fontStyle: string) => {
            canvas.getActiveObjects().forEach((object) => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({fontStyle})
                }
            })
            canvas.renderAll()
        },
        changeFontWeight: (fontWeight: number) => {
            canvas.getActiveObjects().forEach((object) => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    object.set({fontWeight})
                }
            })
            canvas.renderAll()
        },
        changeOpacity: (opacity: number) => {
            canvas.getActiveObjects().forEach((object) => object.set({opacity}))
            canvas.renderAll()
        },
        bringForward: () => {
            canvas.getActiveObjects().forEach((object) => canvas.bringForward(object))
            canvas.renderAll()

            const workspace = getWorkspace()
            workspace?.sendToBack()
        },
        bringBackwards: () => {
            canvas.getActiveObjects().forEach((object) => canvas.sendBackwards(object))
            canvas.renderAll()

            const workspace = getWorkspace()
            workspace?.sendToBack()
        },
        changeFillColor: (fill: string) => {
            setFillColor(fill)
            canvas.getActiveObjects().forEach((object) => object.set({fill}))
            canvas.renderAll()
        },
        changeStrokeWidth: (strokeWidth: number) => {
            setStrokeWidth(strokeWidth)
            canvas.getActiveObjects().forEach((object) => object.set({strokeWidth}))
            canvas.freeDrawingBrush.width = strokeWidth
            canvas.renderAll()
        },
        changeStrokeColor: (stroke: string) => {
            setStrokeColor(stroke)
            canvas.getActiveObjects().forEach((object) => {
                if (isTextType(object.type)) {
                    object.set({fill: stroke})
                    return
                }
                object.set({stroke})
            })
            canvas.freeDrawingBrush.color = stroke
            canvas.renderAll()
        },
        changeStrokeDashArray: (value: number[]) => {
            setStrokeDashArray(value)
            canvas.getActiveObjects().forEach((object) => {
                  object.set({strokeDashArray: value})
            })
            canvas.renderAll()
        },
        addCircle: () => {
            const object = new fabric.Circle({
                ...CIRCLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            })
            addToCanvas(object)
        },
        addSoftRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 50,
                ry: 50,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            })

            addToCanvas(object)
        },
        addRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            })
            object.myId = 'tes1'
            addToCanvas(object)
        },
        addTriangle: () => {
            const object = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            })

            addToCanvas(object)
        },
        addInverseTriangle: () => {
            const HEIGHT = TRIANGLE_OPTIONS.height
            const WIDTH = TRIANGLE_OPTIONS.width

            const object = new fabric.Polygon(
                [
                    { x: 0, y: 0 },
                    { x: WIDTH, y: 0 },
                    { x: WIDTH / 2, y: HEIGHT },
                ],
                {
                ...TRIANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
                }
            )

            addToCanvas(object)
        },
        addDiamond: () => {
            const HEIGHT = DIAMOND_OPTIONS.height
            const WIDTH = DIAMOND_OPTIONS.width

            const object = new fabric.Polygon(
                [
                { x: WIDTH / 2, y: 0 },
                { x: WIDTH, y: HEIGHT / 2 },
                { x: WIDTH / 2, y: HEIGHT },
                { x: 0, y: HEIGHT / 2 },
                ],
                {
                    ...DIAMOND_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
                }
            )

            addToCanvas(object)
        },
        addPentagon: () => {
            const HEIGHT = DIAMOND_OPTIONS.height
            const WIDTH = DIAMOND_OPTIONS.width

            const object = new fabric.Polygon(
                [
                    { x: WIDTH / 2, y: 0 },
                    { x: WIDTH, y: HEIGHT * 0.38 },
                    { x: WIDTH * 0.82, y: HEIGHT }, 
                    { x: WIDTH * 0.18, y: HEIGHT },
                    { x: 0, y: HEIGHT * 0.38 },          
                ],
                {
                    ...DIAMOND_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
                }
            )

            addToCanvas(object)
        },
        addStar: () => {
            const HEIGHT = DIAMOND_OPTIONS.height
            const WIDTH = DIAMOND_OPTIONS.width

            const object = new fabric.Polygon(
                [
                    { x: WIDTH / 2, y: 0 },
                    { x: WIDTH * 0.62, y: HEIGHT * 0.35 },
                    { x: WIDTH, y: HEIGHT * 0.38 },
                    { x: WIDTH * 0.72, y: HEIGHT * 0.62 },
                    { x: WIDTH * 0.82, y: HEIGHT },
                    { x: WIDTH / 2, y: HEIGHT * 0.78 },
                    { x: WIDTH * 0.18, y: HEIGHT },
                    { x: WIDTH * 0.28, y: HEIGHT * 0.62 },
                    { x: 0, y: HEIGHT * 0.38 },
                    { x: WIDTH * 0.38, y: HEIGHT * 0.35 },
                ],
                {
                    ...DIAMOND_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
                }
            )

            addToCanvas(object)
        },
        getActiveSvgColors() {
            const selectedObject = selectedObjects[0]

            if (!selectedObject || !isObjectSvg(selectedObject.type) || selectedObjects.length > 1) {
                return []
            }
            
            const colors = selectedObject?.originalColors || []
            return colors
        },
        //here
        replaceActiveSvgColors: (originalColor, newColor, property) => {
            const selectedObject = selectedObjects[0]

            if (!selectedObject) return


            selectedObject.getObjects().forEach((svg) => {
                if (property === 'Fill' && svg.originalFillColor === originalColor) {
                    svg.set({ fill: newColor })
                }
                else if ( property === 'Stroke' && svg.originalStrokeColor === originalColor) {
                    svg.set({ stroke: newColor })
                }
            })

            const oKey = 'original' + property + 'Color'
            const aKey = 'active' + property + 'Color'

            const i = selectedObject.originalColors?.findIndex(
                (c) => c?.[oKey] === originalColor
            )

            if (i == null || i === -1) return

            if (!selectedObject.originalColors?.[i]) return

            selectedObject.originalColors[i][aKey] = newColor

            selectedObject.fire('modified')

            canvas.fire('object:modified', {
                target: selectedObject
            })

            canvas.renderAll()
        },
        applyColorpaletteToSvg: (palette) => {
            const selectedObject = selectedObjects[0]

            if (!selectedObject || !selectedObject.originalColors) {
                return {}
            }

            const originalColors = selectedObject.originalColors
            const newColorsHistory = [...originalColors]

            const closesColorsMap: Record<string, string> = {}

            let unusedPalette = [...palette]

            // // @ts-ignore
            originalColors.forEach((color, i) => {

                let inputColor = ''
                let prop: 'Fill' | 'Stroke' = 'Fill'

                if (Object.hasOwn(color, 'originalFillColor')) {
                    prop = 'Fill'
                    inputColor = color.originalFillColor
                } else if (Object.hasOwn(color, 'originalStrokeColor')) {
                    prop = 'Stroke'
                    inputColor = color.originalStrokeColor
                }

                const closestColor = getClosestColor(unusedPalette, inputColor)
                const key = `active${prop}Color`
                newColorsHistory[i][key] = closestColor

                if (closestColor !== null) {
                    closesColorsMap[inputColor] = closestColor

                    if (originalColors.length <= palette.length || unusedPalette.length > 1) {
                        const appliedIndex = unusedPalette.indexOf(closestColor)
                        if (appliedIndex > -1) {
                            unusedPalette.splice(appliedIndex, 1)
                        }
                    }

                    if (unusedPalette.length === 0) {
                        unusedPalette = [...palette]
                    }
                }
            })


            //const finalColorPalette: Record<string, string> = {}

            

            selectedObject.getObjects().forEach((svg) => {

                const appliedColors: ColorToApply = {}

                if (Object.hasOwn(svg, 'activeFillColor')) {
                    appliedColors.activeFillColor = closesColorsMap[svg.originalFillColor as string]
                    appliedColors.fill = closesColorsMap[svg.originalFillColor as string]
                } else if (Object.hasOwn(svg, 'activeStrokeColor')) {
                    appliedColors.activeStrokeColor = closesColorsMap[svg.originalStrokeColor as string]
                    appliedColors.stroke = closesColorsMap[svg.originalStrokeColor as string]
                }

                svg.set(appliedColors)
            })

            selectedObject.fire('modified')

            canvas.fire('object:modified', {
                target: selectedObject
            })

            canvas.renderAll()

            return newColorsHistory
        },
        resetSvgColors: () => {

            const selectedObject = selectedObjects[0]
            

            //reset root svg

            const originalColors = selectedObject.originalColors?.map((color) => {

                const colorObject = {...color}

                if (Object.hasOwn(colorObject, 'activeFillColor')) {
                    colorObject.activeFillColor = colorObject.originalFillColor
                }

                if (Object.hasOwn(colorObject, 'activeStrokeColor')) {
                    colorObject.activeStrokeColor = colorObject.originalStrokeColor
                }

                return colorObject
            })

            selectedObject.originalColors = originalColors
            
            //reset children of svg
            selectedObject.getObjects().forEach((svg) => {
                const appliedColors: ColorToApply = {}
    
                if (Object.hasOwn(svg, 'activeFillColor')) {
                    appliedColors.activeFillColor = svg.originalFillColor
                    appliedColors.fill = svg.originalFillColor
                } else if (Object.hasOwn(svg, 'activeStrokeColor')) {
                    appliedColors.activeStrokeColor = svg.originalStrokeColor
                    appliedColors.stroke = svg.originalStrokeColor
                }

                svg.set(appliedColors)
            })
            

            selectedObject.fire('modified')

            canvas.fire('object:modified', {
                target: selectedObject
            })

            canvas.renderAll()

            return originalColors
        },
        getActiveFillColor: () => {
            const selectedObject = selectedObjects[0]


            if (!selectedObject || selectedObject.type) {
                return fillColor
            }
            const value = selectedObject.get('fill')

            if (value instanceof fabric.Pattern || value instanceof fabric.Gradient || value === undefined) {
                return fillColor
            }

            return value
        },
        getActiveStrokeColor: () => {
            const selectedObject = selectedObjects[0]

            if (!selectedObject) {
                return strokeColor
            }
            
            return selectedObject.get('stroke') || strokeColor
        },
        getActiveStrokeWidth: () => {
            return selectedObjects[0]?.get('strokeWidth') || strokeWidth
        },
        getActiveStrokeDashArray: () => {
            return selectedObjects[0]?.get('strokeDashArray') || STROKE_DASH_ARRAY
        },
        changeFontFamily(value) {
            setFontFamily(value)
            canvas.getActiveObjects().forEach((object) => {
                if (isTextType(object.type)) {
                    // @ts-ignore
                    // fontFamily exists does exist as propery
                    object.set({ fontFamily: value })
                }
            })
            canvas.renderAll()
        },
        onUndo: () => undo(),
        onRedo: () => redo(),
        canvas,
        selectedObjects
    }
}

function UseEditor ({
    defaultState,
    defaultHeight,
    defaultWidth,
    clearSelectionCallback,
    saveCallback,
    initialCanvasImageFile
}: EditorHookProps) {

    const initialState = useRef(defaultState)
    const initialWidth = useRef(initialCanvasImageFile?.width ?? defaultWidth)
    const initialHeight = useRef(initialCanvasImageFile?.height ?? defaultHeight)    

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])

    const [fontFamily, setFontFamily] = useState(FONT_FAMILY)
    const [fillColor, setFillColor] = useState(FILL_COLOR)
    const [strokeColor, setStrokeColor] = useState(STROKE_COLOR)
    const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH)
    const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY)

    const { 
        save, 
        canRedo, 
        canUndo, 
        undo, 
        redo,
        canvasHistory,
        setHistoryIndex,
    } = UseHistory({ canvas, saveCallback })
    
    const { copy, paste } = UseClipboard({ canvas })

    const { autoZoom } = useAutoResize({
        canvas,
        container
    })

    //enable for production
    //useWindowEvents()

    useCanvasEvents({
        save,
        canvas,
        setSelectedObjects,
        clearSelectionCallback
    })
    
    useHotkeys({
        undo,
        redo,
        copy,
        paste,
        save,
        canvas,
    })

    useLoadState({
        canvas,
        autoZoom,
        initialState,
        canvasHistory,
        setHistoryIndex,
    })

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({
                save,
                undo,
                redo,
                canUndo,
                canRedo,
                canvas,
                fillColor,
                setFillColor,
                strokeColor,
                setStrokeColor,
                strokeWidth,
                setStrokeWidth,
                selectedObjects,
                strokeDashArray,
                setStrokeDashArray,
                fontFamily,
                setFontFamily,
                copy,
                paste,
                autoZoom
            })
        }
        
        return undefined
    },  [canRedo, canUndo, undo, redo, save,canvas, fillColor, strokeColor, strokeWidth, selectedObjects, strokeDashArray, fontFamily, copy, paste, autoZoom])

    const init = useCallback(({
        initialCanvas,
        initialContainer
    }: initialEditor) => {
        fabric.Object.prototype.set({
            cornerColor: "#FFF",
            cornerStyle: 'circle',
            borderColor: "#8ACC10",
            borderScaleFactor: 1.4,
            transparentCorners: true,
            borderOpacityWhenMoving: 0.4,
            cornerStrokeColor: '#8ACC10'
        })

        const initialworkspace = new fabric.Rect({
            width: initialWidth.current,
            height: initialHeight.current,
            name: "clip",
            fill: 'white',
            strokeWidth: 2,
            stroke: "#E5E5E5",
            selectable: false,
            hasControls: false,
            shadow: new fabric.Shadow({
                color: "rgba(0,0,0,0.6)",
                blur: 5
            })
        })

        initialCanvas.setHeight(initialContainer.offsetHeight)
        initialCanvas.setWidth(initialContainer.offsetWidth)

        initialCanvas.add(initialworkspace)
        initialCanvas.centerObject(initialworkspace)
        initialCanvas.clipPath = initialworkspace

        setCanvas(initialCanvas)
        setContainer(initialContainer)


        if (initialCanvasImageFile) {
            fabric.loadSVGFromString(initialCanvasImageFile.content,
                (objects, options) => {
                    const detectedColors = detectColorsFromObjects(objects)
                    const svg = fabric.util.groupSVGElements(objects, {...options})
                    
                    svg.set({
                        originalColors: detectedColors,
                        originalSvgString: initialCanvasImageFile.content,
                    })
                    svg.scaleToHeight(initialworkspace?.height || 0)
                    //svg.scaleToHeight((initialworkspace?.height || 0) * 0.8)
                    initialCanvas.add(svg)
                    initialCanvas.centerObject(svg)
                    initialCanvas.setActiveObject(svg)

                    setSelectedObjects([svg])
                }
            )
        }


        const currentState = JSON.stringify(
            initialCanvas.toJSON(JSON_KEYS)
        )
        canvasHistory.current = [currentState]
        setHistoryIndex(0)
    }, [canvasHistory, setHistoryIndex])


    return { init, editor }
}

export default UseEditor