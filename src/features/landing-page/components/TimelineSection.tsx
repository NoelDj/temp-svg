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
        <section className='mt-20 mb-40'>
            <div className="border shadow-md px-5 py-10 rounded-2xl">
                <div className="w-full flex-col justify-start items-center lg:gap-12 gap-10 inline-flex">
                    <div className="w-full flex-col justify-start items-center gap-1 flex">
                        <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">How it works</h2>
                        <p className="w-full text-center text-gray-500 text-base font-normal leading-relaxed">SVGColor lets you upload any svg to make changes to your file.</p>
                            
                    </div>
                    <div className="w-full justify-start gap-4 flex md:flex-row flex-col">
                        {
                            timeLineEvents.map(item => <TimelineEvent key={item.step} item={item} />)
                        } 
                    </div>
                    
                </div>
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
        <>
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                    <div className="self-stretch text-center text-primary text-4xl font-extrabold font-manrope leading-normal">{step}</div>
                    <h3 className="self-stretch text-center text-gray-900 text-xl font-semibold leading-8">{title}</h3>
                </div>
                <p className="self-stretch text-center text-gray-700 text-base font-normal leading-relaxed">{description}</p>
            </div>
            {
                step !== '04' && 
                    <div className="self-center">
                        <svg className="md:flex hidden" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" >
                            <path d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004" stroke="#99E600" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> 
                    </div>
            }
        </>
    )
}