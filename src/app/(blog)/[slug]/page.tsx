import Link from "next/link"
import blogList from "../constants"
import styles from "../blog.module.css";
import Header from "@/features/landing-page/components/Header";
import { cn } from "@/lib/utils";


//turn on for production
export const dynamicParams = true



export async function generateStaticParams(): Promise<{
    slug: string
}[]> {
    return blogList
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const currentPost = blogList.find((blog) => blog.slug === slug)
    
    if (!currentPost) return null

    const { title, component: content, img } = currentPost

    const otherPosts = blogList.filter((blog) => blog.slug !== slug)

    return (
        <div className="mx-auto mt-20 w-full max-w-[900px]">
            <main className={cn(styles.blogContent, 'mb-20')}>
                <div className="mb-2 rounded-3xl overflow-hidden">
                    <img src={img} alt="" width="100%" />
                </div>

                <article>
                    <h1>{title}</h1>
                    {content}
                </article>

            </main>

            <div className="h-[1px] w-full bg-slate-200 mb-6"></div>
            
            <section className="mb-20">
                <div>
                    <Link href="/svg-blog">
                        <h2 className="text-3xl mb-4 font-medium">SVGColor Blog</h2>
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                    {
                        otherPosts.map(({slug, img, title}) => (
                            <div key={slug} className="border rounded-xl">
                                <div className="rounded-t-2xl overflow-hidden">
                                    <Link href={`/${slug}`} className="text-xl font-medium"><img src={img} alt="" /></Link>
                                </div>
                                <div className="p-2">
                                    <Link href={`/${slug}`} className="text-xl font-medium">{title}</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}



// id: post.id does not work
// slug: post.id does work
// id: String(post.id) does work