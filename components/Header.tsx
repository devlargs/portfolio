import Link from 'next/link';

const Header = () => {
    return  <header className="h-24 sm:h-32 flex items-center">
    <div className="container mx-auto px-6 sm:px-12 flex items-center justify-between">
        <div className="text-black font-black text-2xl flex items-center">
            {/* <span className="mr-4"></span> @devlargs */}
        </div>
        <div className="flex items-center">
            <nav className="text-black text-lg hidden lg:flex items-center">
                <Link href="/">
                <a href="#" className="py-2 px-6 flex hover:text-blue-500">
                    Home
                </a>
                </Link>
                <Link href="/projects">
                <a href="#" className="py-2 px-6 flex hover:text-blue-500">
                    Projects
                </a>
                </Link>
                <Link href="/techstack">
                <a href="#" className="py-2 px-6 flex hover:text-blue-500">
                    Tech Stack
                </a>
                </Link>

                <Link href="/blog">
                <a href="#" className="py-2 px-6 flex hover:text-blue-500">
                    Blog
                </a>
                </Link>

                <Link href="/contact">
                <a href="#" className="py-2 px-6 flex hover:text-blue-500">
                    Contact Me
                </a>
                </Link>
               
            </nav>
            <button className="lg:hidden flex flex-col">
                <span className="w-6 h-px bg-gray-900 mb-1"></span>
                <span className="w-6 h-px bg-gray-900 mb-1"></span>
                <span className="w-6 h-px bg-gray-900 mb-1"></span>
            </button>
        </div>
    </div>
</header>

}

export default Header;