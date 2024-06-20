import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Navbar = () => {
    return (
        <nav className='border-b px-8 py-6 shadow bg-white text-black'>
            <div className='flex justify-between items-center'>
                <Image src="https://www.voshod-auto.ru/static/media/logo-dark.77e2b180bd76e70559fb02ffd9558192.svg" width={150} height={150} alt='восход' />
                {/* <div className='bg-black'>x</div> */}
                <Link href="https://www.voshod-auto.ru/rent/page/1" target="_blank">
                    <button className='px-4 py-2 border border-[#ff585d] rounded-lg'>Заказать звонок</button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar