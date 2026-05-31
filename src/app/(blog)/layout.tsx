import Footer from '@/features/landing-page/components/Footer'
import Header from '@/features/landing-page/components/Header'
import React from 'react'

interface BlogLayoutProps {
    children: React.ReactNode
    slug: string
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
    return ( 
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
 
export default BlogLayout;