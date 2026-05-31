import Link from "next/link"

function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="mt-20 w-full pt-8 pb-3 bg-[#030222] text-white">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-4 mb-10 gap-x-20">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">SVGColor</h3>
                        <Link href="https://www.producthunt.com/products/svgcolor-simple-svg-editor">
                            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=473136&theme=light" alt="" />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-bold mb-4">Links</h3>
                        <Link href="/">SVG color changer</Link>
                        <Link href="/svg-blog">SVG blog</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Policies</h3>
                    </div>
                </div>
                <div className="border-t pt-4 border-slate-600">
                    <Link href="https://svgcolor.com" className="text-sm">© {year} <span className="mx-1.5">⚪</span> SVGColor</Link>
                </div>
            </div>
        </footer>    
    )
}

export default Footer