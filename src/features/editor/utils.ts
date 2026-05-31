import chroma from "chroma-js"
import { fabric } from "fabric"
import { ArrowKeys, DetectedColors, FileFormat, FillColors, ObjectColors, StrokeColors } from "./types"

export function isTextType(type: string | undefined) {
    return type === "text" || type === "i-text" || type === "textbox"
}

export function isObjectSvg(type: string | undefined) {
    return type === "group"
}

export function getClosestColor(palette: string[], compareColor: string): string {
    const inputChroma = chroma(compareColor)
    let closestColor: string | null = null
    let minDistance = Infinity

    palette.forEach((paletteColor: string, index: number) => {
        const currentChroma = chroma(paletteColor)
        const distance = chroma.distance(inputChroma, currentChroma, 'lab')
        if (distance < minDistance) {
            minDistance = distance
            closestColor = paletteColor
        }
    })

    if (closestColor === null) {
        closestColor = palette[0]
    }

    return closestColor
}

export function calculateActiveobjectPosition(key: ArrowKeys, activeObject: fabric.Object, step = 1) {
    if (!activeObject) return

    if (activeObject.top === undefined || activeObject.left === undefined) return

    const directions: Record<ArrowKeys, Record<string, number>> = {
        'ArrowUp' : {top: activeObject.top - step},
        'ArrowDown': {top: activeObject.top + step},
        'ArrowLeft': {left: activeObject.left - step},
        'ArrowRight': {left: activeObject.left + step},
    }

    return directions[key]
}

export function createFilter (value: string) {
    let effect

    switch (value) {
        case "greyscale":
            effect = new fabric.Image.filters.Grayscale()
        break
        case "polaroid":
        // @ts-ignore
            effect = new fabric.Image.filters.Polaroid()
        break
        case "sepia":
            effect = new fabric.Image.filters.Sepia()
        break
        case "kodachrome":
        // @ts-ignore
            effect = new fabric.Image.filters.Kodachrome()
        break
        case "contrast":
            effect = new fabric.Image.filters.Contrast({ contrast: 0.3 })
        break
        case "brightness":
            effect = new fabric.Image.filters.Brightness({ brightness: 0.8 })
        break
        case "brownie":
        // @ts-ignore
            effect = new fabric.Image.filters.Brownie()
        break
        case "vintage":
        // @ts-ignore
            effect = new fabric.Image.filters.Vintage()
        break
        case "technicolor":
        // @ts-ignore
            effect = new fabric.Image.filters.Technicolor()
        break
        case "pixelate":
            effect = new fabric.Image.filters.Pixelate()
        break
        case "invert":
            effect = new fabric.Image.filters.Invert()
        break
        case "blur":
            effect = new fabric.Image.filters.Blur()
        break
        case "sharpen":
            effect = new fabric.Image.filters.Convolute({
                matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            })
        break
        case "emboss":
            effect = new fabric.Image.filters.Convolute({
                matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
            })
        break
        case "removecolor":
        // @ts-ignore
            effect = new fabric.Image.filters.RemoveColor({
                threshold: 0.2,
                distance: 0.5
            })
        break
        case "blacknwhite":
        // @ts-ignore
            effect = new fabric.Image.filters.BlackWhite()
        break
        case "vibrance":
        // @ts-ignore
            effect = new fabric.Image.filters.Vibrance({ 
                vibrance: 1,
            })
        break
        case "blendcolor":
            effect = new fabric.Image.filters.BlendColor({ 
                color: "#00ff00",
                mode: "multiply",
            })
        break
        case "huerotate":
            effect = new fabric.Image.filters.HueRotation({ 
                rotation: 0.5,
            })
        break
        case "resize":
            effect = new fabric.Image.filters.Resize()
            break
        case "gamma":
        // @ts-ignore
            effect = new fabric.Image.filters.Gamma({
                gamma: [1, 0.5, 2.1]
            })
        case "saturation":
            effect = new fabric.Image.filters.Saturation({
                saturation: 0.7,
            })
        break
            default:
            effect = null
        return
    }

  return effect
}

export function detectColorsFromObjects(
    objects: fabric.Object[],
): DetectedColors {

    const colorsFound: DetectedColors = []
    const detectedFillColors = new Set()
    const detectedStrokeColors = new Set()


    for (let i = 0; i < objects.length; i++) {
        const object = objects[i]

        if (typeof object.fill === 'string' && object.fill) {
            if (!detectedFillColors.has(object.fill)) {
                colorsFound.push({
                    originalFillColor : object.fill,
                    activeFillColor : object.fill
                })
            }

            object.originalFillColor = object.fill
            object.activeFillColor = object.fill
            
            
            detectedFillColors.add(object.fill)
        }

        if (typeof object.stroke === 'string' && object.stroke) {
            colorsFound.push({
                originalStrokeColor: object.stroke,
                activeStrokeColor: object.stroke,
            })
    
            object.originalStrokeColor = object.stroke
            object.activeStrokeColor = object.stroke

            detectedStrokeColors.add(object.stroke)
        }
    }

    return colorsFound
}

export function transformText(objects: fabric.Object[]) {
    if (!objects) return;

    objects.forEach((item: any) => {
        if (item.objects) {
            transformText(item.objects);
        } else {
            item.type === "text" && (item.type === "textbox");
        }
    })
}

export function downloadFile(file: string, type: FileFormat) {
    const anchorElement = document.createElement("a")
    anchorElement.href = file
    anchorElement.download = `Downloaded-file.${type}`
    document.body.appendChild(anchorElement)
    anchorElement.click()
    anchorElement.remove()
}