import blogList from '@/app/(blog)/constants'
import Link from 'next/link'

function BlogSection() {
    return (
        <section className='mb-20'>
            <div className='border-b border-b-slate-200 pb-4 mb-16'>
                <Link href="/svg-blog">
                    <h3 className='text-4xl font-semibold'>Posts</h3>
                </Link>
                <p className='text-lg text-gray-800 mt-2'>Blog with useful resources for designers and developers.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-x-4 gap-y-10">
                {
                    blogList.slice(0,3).map(({slug, img, title, excerpt}) => (
                        <div key={slug} className="border rounded-xl hover:-translate-y-2 transition-translate transition duration-300 ease-in-out ">
                            <div className="rounded-t-2xl overflow-hidden">
                                <Link href={`/${slug}`} className="text-xl font-medium"><img src={"images/blog-post-images/" + img} className='w-full' alt="" /></Link>
                            </div>
                            <div className="p-2">
                                <Link href={`/${slug}`} className="text-xl font-medium mb-3">{title}</Link>
                                <p className='text-gray-700 text-sm'>{excerpt}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default BlogSection