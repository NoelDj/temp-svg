import Blog1 from "./components/Blog1"
import BlogNews from "./components/BlogNews"

type BlogItem = {
    slug: string
    title: string
    component: React.ReactElement
    img: string
    excerpt?: string
}

const blogList: BlogItem[] = [
    {
        slug: 'updates-and-changes',
        title: 'Announcing: Release of SVGColor design editor',
        component: <BlogNews />,
        img: 'https://svgcolor.com/blog-img/image4.jpg'
    },
    {
        slug: 'what-is-a-svg-file-for-cricut',
        title: 'What is a svg file for Cricut Design Space',
        component: <Blog1 />,
        img: 'https://svgcolor.com/blog-img/image4.jpg'
    },
    {
        slug: 'which-program-opens-svg-files',
        title: 'Which program opens svg files?',
        component: <Blog1 />,
        img: 'https://svgcolor.com/blog-img/image3.jpg'
    },
    {
        slug: 'how-to-change-svg-color-in-an-img-tag',
        title: 'How to change svg color in an img tag',
        component: <Blog1 />,
        img: 'https://svgcolor.com/blog-img/image1.jpg'
    },
    {
        slug: 'how-to-change-the-color-of-svg-using-css',
        title: 'How to change the color of svg using css',
        component: <Blog1 />,
        img: 'https://svgcolor.com/blog-img/image2.jpg'
    },
    {
        slug: 'what-is-a-svg-icon',
        title: 'What is a svg icon?',
        component: <Blog1 />,
        img: 'https://svgcolor.com/blog-img/image5.jpg'
    }
]

export default blogList