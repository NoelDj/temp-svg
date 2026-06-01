import React from 'react'
import blogList from '../constants'
import Link from 'next/link'

function BlogPage() {



    return (
        <main className="mx-auto mt-20 w-full max-w-[1200px]">
            <div className='border-b border-b-slate-200 pb-4 mb-16'>
                <h1 className='text-5xl font-semibold'>SVGColor Posts</h1>
                <p className='text-lg text-gray-800 mt-2'>Read latest news, updates, and tips from SVGColor.</p>
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-10">
                {
                    blogList.map(({slug, img, title, excerpt}) => (
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
        </main>
    )
}

export default BlogPage