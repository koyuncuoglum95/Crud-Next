'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathname = usePathname()

    const navItems = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "About",
            href: "/about"
        },
        {
            label: "FAQ",
            href: "/about/faq"
        },
        {
            label: 'Posts',
            href: '/posts'
        },
        {
            label: 'Crud',
            href: '/crud'
        },
    ]
  return (
    <div>
        <ul className='flex gap-5 py-10'>
            {navItems.map((n, index) => (
                <li key={index}>
                    <Link href={n.href} className={pathname === `${n.href}` ? 'text-red-600 font-bold' : '' }>
                        {n.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Header