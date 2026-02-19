import Link from 'next/link';

export default function LandingFooter() {
    return (
        <footer className="w-full bg-transparent text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 VORT-X. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="mailto:yuvx.co@gmail.com" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    )
}
