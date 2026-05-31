type Id = string

type Collection = {
    id: Id
    name: string
    description?: string
}

type Item = {
    id: Id
    collection: Id
    authro: string
    license: string
    name: string
    url: string
    tags: string[]
    description?: string
}

export const CollectionSvgData: Collection[] = [
    { id: '1', name: 'Biological Gene Duotone Icons Collection' },
    { id: '2', name: 'Office Supplies Tritone Bordered Vectors Collection' },
    { id: '3', name: 'Travel Theme Candy Vectors Collection' },
    { id: '4', name: 'Travel Industry Icons Collection' },
    { id: '5', name: 'Business Sharp Line Duotone Icons Collection' },
    { id: '6', name: 'Bathroom Duotone Dashed Vectors Collection' },
    { id: '7', name: 'Medical Duotone Line Icons Collection' },
    { id: '8', name: 'Isometric 3d Interface Icons Collection' },
    { id: '9', name: 'Financial Business Avatar Vectors Collection' },
]