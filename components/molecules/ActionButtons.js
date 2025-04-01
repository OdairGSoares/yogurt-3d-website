"use client"

import Button from "../atoms/Button"

export default function ActionButtons({ color = "#7E22CE" }) {
  return (
    <div className="flex flex-col gap-3 pt-4">
      <Button
        variant="primary"
        color={color}
        fullWidth
      >
        Experimentar
      </Button>
      
      <Button
        variant="secondary"
        color={color}
        fullWidth
      >
        Mais informações
      </Button>
    </div>
  )
} 