import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

type FontSizeInput = {
    value: number
    onChange: (value: number) => void
}

function FontSizeInput({
    value,
    onChange
}: FontSizeInput) {
    const increment = () => onChange(value + 1)
    const decrement = () => onChange(value - 1)

    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {

        const inputValue = e.currentTarget.value
        
        if (inputValue.length > 4) return

        const newValue = parseInt(inputValue, 10)

        if (isNaN(newValue)) return

        onChange(newValue)
    }

    return (
        <div className="flex items-center">
            <Button
                onClick={decrement}
                variant='outline'
                className="p-2 rounded rounded-r-none border-r-0"
                size='icon'
            >
                <Minus />
            </Button>
            <Input 
                onChange={handleChange}
                value={value}
                className="w-[50px] focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
            />
            <Button
                onClick={increment}
                variant='outline'
                className="p-2 rounded rounded-l-none border-l-0"
                size='icon'
            >
                <Plus />
            </Button>
        </div>
    )
}

export default FontSizeInput