import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <Link href="/" className="font-semibold text-gray-900 tracking-tight">
        VentureCheck
      </Link>
      <div className="flex gap-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <Link href="/core" className="hover:text-gray-900 transition-colors">
          Core
        </Link>
        <Link href="/research" className="hover:text-gray-900 transition-colors">
          Research
        </Link>
        <Link href="/product" className="hover:text-gray-900 transition-colors">
          Product
        </Link>
        <Link href="/pricing" className="hover:text-gray-900 transition-colors">
          Pricing
        </Link>
        <Link href="/marketing" className="hover:text-gray-900 transition-colors">
          Marketing
        </Link>
        <Link href="/chat" className="hover:text-gray-900 transition-colors">
          Chat
        </Link>
        <Link href="/docs" className="hover:text-gray-900 transition-colors">
          Docs
        </Link>
      </div>
    </nav>
  );
}
