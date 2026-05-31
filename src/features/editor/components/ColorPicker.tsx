'use client'

import dynamic from 'next/dynamic'
import { rgbaObjectToString } from "@/lib/utils";

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
  return (
    <div className="w-full flex flex-col gap-y-8">
        <ChromePicker
            color={value}
            onChangeComplete={({ rgb }) => {
                const rgbaValue = rgbaObjectToString(rgb)
                onChange(rgbaValue)
            }}
            className="border-slate-200 border rounded-2xl"
        />
    </div>
  )
}

export default ColorPicker