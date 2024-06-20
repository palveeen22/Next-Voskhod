import Image from 'next/image';
import React from 'react';

const Footer = () => {
    // Get the current year dynamically
    const currentYear = new Date().getFullYear();

    return (
        <nav className='border-b px-8 py-6 shadow bg-white text-black'>
            <p className='text-[#484848] text-center'>алвин-восход © {currentYear} год</p>
        </nav>
    );
};

export default Footer;
