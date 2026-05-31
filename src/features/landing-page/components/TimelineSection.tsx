type TimelineEvent = {
    description: string
    title: string
    step: string
}

const timeLineEvents: TimelineEvent[] = [
    {
        step: '01',
        title: 'Upload your svg',
        description: 'Click the button and upload your SVG file.'
    },
    {
        step: '02',
        title: 'Color Detection Sytem',
        description: 'The color detection system analyzes your svg color. It recommends new colors based on the image you uploaded.'
    },
    {
        step: '03',
        title: 'Change Colors',
        description: 'Choose the colors you like from the color palettes. You can also use the color picker to choose colors you like.'
    },
    {
        step: '04',
        title: 'Download SVG',
        description: 'Click the download button and your SVG is ready for use.'
    }
]

function TimelineSection() {
    return (
        <section className='mt-20'>
            <div className='mb-10'>
                <p className='text-md mb-1'>How it works</p>
                <h2 className='text-4xl font-medium mb-2'>Change svg colors in few steps</h2>
                <p className='max-w-[500px] text-gray-700'>A simple, guided process so you can go from zero to live — no technical expertise needed.</p>
            </div>
            <div>
                {
                    timeLineEvents.map((item) => (
                        <TimelineEvent key={item.step} item={item} />
                    ) )
                }
            </div>
        </section>
    )
}

export default TimelineSection

type TimelineEventProps = {
    item: TimelineEvent
}


function TimelineEvent({
    item
}: TimelineEventProps) {

    const{title, step, description} = item

    return (
        <div className='flex gap-x-20'>
            <div className='flex flex-col items-center'>
                <div className='size-16 ring-2 ring-primary rounded-full flex items-center justify-center'>
                    <span className='text-lg'>{step}</span>
                </div>
                {step !== '04' && <div className='flex-1 border border-slate-200 border-dashed mt-2 w-[1px]'></div>}
            </div>
            <div className='w-1/2 mb-20'>
                <h3 className='text-3xl font-medium mb-2'>{title}</h3>
                <p className='text-gray-700 mb-4'>{description}</p>
                <div className='h-[460px] bg-violet-200 border border-violet-500 rounded-2xl'></div>
            </div>
        </div>
    )
}