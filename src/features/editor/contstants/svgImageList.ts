type SvgElement = {
    url: string
    name: string
    id: number | string
}

const svgImagesList: SvgElement[] = [
    {
        url: 'http://localhost:3000/test-svg.svg',
        name: 'Test this svg',
        id: '30'
    },
    {
        url: 'http://localhost:3000/board.svg',
        name: 'Awesome board',
        id: '1'
    },
    {
        url: '/palm-tree.svg',
        name: 'palm-tree',
        id: '2'
    },
    {
        url: '/castle.svg',
        name: 'castle',
        id: '3'
    },
    {
        url: '/flower-svgrepo-com.svg',
        name: 'flower-svgrepo-com',
        id: '4'
    },
    {
        url: '/home-1-svgrepo-com.svg',
        name: 'home-1-svgrepo-com',
        id: '5'
    },
    {
        url: '/mountain-svgrepo-com.svg',
        name: 'mountain-svgrepo-com',
        id: '6'
    },
    {
        url: '/skyscrapers-town-svgrepo-com.svg',
        name: 'Skyscraper',
        id: '8'
    }
]

export default svgImagesList