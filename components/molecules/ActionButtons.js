"use client"

import Button from "../atoms/Button"

export default function ActionButtons({ color = "#7E22CE" }) {
  const handleExperimentar = () => {
    try {
      window.open('https://www.vigor.com.br/saudavel/vigor-viv-natural', '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Erro ao abrir link:', error);
      // Fallback: tentar abrir na mesma aba
      window.location.href = 'https://www.vigor.com.br/saudavel/vigor-viv-natural';
    }
  };

  const handleMaisInformacoes = () => {
    try {
      window.open('https://www.vigor.com.br/saudavel/vigor-viv-natural', '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Erro ao abrir link:', error);
      // Fallback: tentar abrir na mesma aba
      window.location.href = 'https://www.vigor.com.br/saudavel/vigor-viv-natural';
    }
  };

  return (
    <div className="flex flex-col gap-3 pt-4">
      <Button
        variant="primary"
        color={color}
        fullWidth
        onClick={handleExperimentar}
        aria-label="Experimentar Vigor Viv - Abrir em nova aba"
      >
        Experimentar
      </Button>
      
      <Button
        variant="secondary"
        color={color}
        fullWidth
        onClick={handleMaisInformacoes}
        aria-label="Mais informações sobre Vigor Viv - Abrir em nova aba"
      >
        Mais informações
      </Button>
    </div>
  )
} 