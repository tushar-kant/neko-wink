'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Nekoss
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-purple-200 transition duration-300">
            Home
          </Link>
          {/* Add more navigation links here if needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
