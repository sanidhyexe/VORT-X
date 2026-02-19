
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';

const VortXLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      className="h-6 sm:h-8"
      fill="currentColor"
    >
      <text
        x="10"
        y="40"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="40"
        fontWeight="bold"
        className="text-white"
      >
        VORT-X
      </text>
    </svg>
  );

export default function LandingHeader() {
  return (
    <header className="fixed top-0 z-50 flex h-16 sm:h-20 w-full items-center justify-between bg-transparent px-4 md:px-6">
      <Link href="/landing" className="flex items-center gap-2">
        <Gamepad2Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <VortXLogo />
      </Link>
     
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
                Dashboard
            </Button>
        </Link>
        <Link href="/">
            <Button variant="gradient" className="rounded-full h-9 sm:h-10 px-4 sm:px-6">
                Enter App
            </Button>
        </Link>
      </div>
    </header>
  );
}

function Gamepad2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.01.152v3.516a4 4 0 0 0 3.978 4.41c.006.052.01.101.01.152v2.184A2.69 2.69 0 0 0 9.37 22h5.26a2.69 2.69 0 0 0 2.69-2.69v-2.184c0-.051.004-.1.01-.152a4 4 0 0 0 3.978-4.41V8.59c0-.051-.004-.1-.01-.152A4 4 0 0 0 17.32 5Z" />
    </svg>
  );
}
