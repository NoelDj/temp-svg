import { Crown } from "lucide-react"
import Link from "next/link"

function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="mt-20 w-full pt-8 pb-3 bg-[#030222] text-white">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid md:grid-cols-2 mb-10 gap-x-20">
                    <div className="flex flex-col gap-4">
                        <Link href="/">
                            <img src="/images/svgcolor-logo-light.png" alt="SVGColor logo light" />
                        </Link>
                        <Link href="https://www.producthunt.com/products/svgcolor-simple-svg-editor">
                            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=473136&theme=light" alt="" />
                        </Link>
                    </div>
                     <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-bold mb-4">Product</h3>
                        <Link href="/">SVG Color changer</Link>
                        <Link href="/svg-blog">SVG blog</Link>
                        {/* <Link href="/pricing">Pricing</Link>
                        <Link href="/pro" className="flex items-center gap-2">Premium<Crown size={18} /></Link> */}
                    </div>
                    {/* <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-bold mb-4">Information</h3>
                        <Link href="/svg-blog">SVG blog</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/#faq">FAQ</Link>
                    </div> */}
                    {/* <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-bold mb-4">Policies</h3>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/refund-and-cancellation-policy">Refund and cancellation Policy</Link>
                        <Link href="/promotions-terms-and-conditions">Promotions terms and conditions</Link>
                    </div> */}
                </div>
                <div className="border-t pt-4 border-slate-600">
                    <Link href="https://svgcolor.com" className="text-sm">© {year} <span className="mx-1.5">⚪</span> SVGColor</Link>
                </div>
            </div>
        </footer>    
    )
}

export default Footer