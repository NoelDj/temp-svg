import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function Logo() {
    return (
        <Link href="/home">
            <div className='size-8 relative shrink-0'>
                <Image src="/logo.svg" alt='Logo' className='shrink-0 hover:opacity-75' width={32} height={32}/>
            </div>
        </Link>
    )
}
