"use client"

import NavLink from "../atoms/NavLink"

export default function Navigation({ color = "#7E22CE" }) {
  const links = [
    { href: "#", label: "Home", isActive: true },
    { href: "#", label: "Sobre Nós", isActive: false },
    { href: "#", label: "Contato", isActive: false },
  ]

  return (
    <nav className="hidden md:flex gap-8">
      {links.map((link, index) => (
        <NavLink 
          key={index}
          href={link.href}
          isActive={link.isActive}
          color={color}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
} 