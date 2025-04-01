"use client"

import YogurtShowcase from "../../components/templates/YogurtShowcase"
import { flavorsData } from "../../lib/flavors"

export default function Home() {
  return (
    <main className="w-full h-screen">
      <YogurtShowcase flavorsData={flavorsData} />
    </main>
  )
}

