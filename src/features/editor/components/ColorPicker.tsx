'use client'

import dynamic from 'next/dynamic'
import { rgbaObjectToString } from "@/lib/utils";
import { useRef, useState } from 'react';
import { RGBColor } from 'react-color';

const ChromePicker = dynamic(
    () => import('react-color').then((mod) => mod.ChromePicker),
    { ssr: false }
)

type ColorPickerProps = {
  value: string;
  onChange: (value: string) => void;
}

function ColorPicker({
    value,
    onChange
}: ColorPickerProps) {

    const [colorValue, setColorValue] = useState(value)

    function handleChange(rgb: RGBColor | "transparent") {
        const rgbaValue = rgbaObjectToString(rgb)
        setColorValue(rgbaValue)
    }

    function handleChangeComplete(rgb: RGBColor | "transparent") {
        const rgbaValue = rgbaObjectToString(rgb)

        onChange(rgbaValue)
        setColorValue(rgbaValue)
    }


  return (
    <div className="w-full flex flex-col gap-y-8">
        <ChromePicker
            color={colorValue}
            onChange={({ rgb }) => handleChange(rgb)}
            onChangeComplete={({ rgb }) => handleChangeComplete(rgb)}
            className="border-slate-200 border rounded-2xl"
        />
    </div>
  )
}

export default ColorPicker