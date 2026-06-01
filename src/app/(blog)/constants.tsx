import Blog1 from "./components/Blog1"
import Blog2 from "./components/Blog2"
import Blog4 from "./components/Blog4"
import Blog5 from "./components/Blog5"
import BlogNews from "./components/BlogNews"

type BlogItem = {
    slug: string
    title: string
    component: React.ReactElement
    img: string
    excerpt?: string
}

const blogList: BlogItem[] = [
    // {
    //     slug: 'updates-and-changes',
    //     title: 'Announcing: Release of SVGColor design editor',
    //     component: <BlogNews />,
    //     img: 'image4.jpg',
    //     excerpt: 'Latest updates and features for SVGColor'
    // },
    {
        slug: 'what-is-a-svg-file-for-cricut',
        title: 'What is a svg file for Cricut Design Space',
        component: <Blog1 />,
        img: 'image4.jpg',
        excerpt: 'SVG files are great for digital cutting machines, like the Cricut Maker and Silhouette Cameo.'
    },
    {
        slug: 'which-program-opens-svg-files',
        title: 'Which program opens svg files?',
        component: <Blog2 />,
        img: 'image3.jpg',
        excerpt: 'SVG files can be opened with many different programs, but we recommend using Inkscape or Adobe Illustrator.'
    },
    {
        slug: 'how-to-change-svg-color-in-an-img-tag',
        title: 'How to change svg color in an img tag',
        component: <Blog1 />,
        img: 'image1.jpg',
        excerpt: 'When you are working in graphic design, you are often going to need to change the color of your SVG images.'
    },
    {
        slug: 'how-to-change-the-color-of-svg-using-css',
        title: 'How to change the color of svg using css',
        component: <Blog4 />,
        img: 'image2.jpg',
        excerpt: 'The color of an SVG file is defined in the element and can be changed by modifying the attributes of that element.'
    },
    {
        slug: 'what-is-a-svg-icon',
        title: 'What is a svg icon?',
        component: <Blog5 />,
        img: 'image5.jpg',
        excerpt: 'SVG icons are a great way to display your content in an attractive way.'
    }
]

export default blogList