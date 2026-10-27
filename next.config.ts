import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Fixa a raiz do projeto (evita o Next inferir outro diretório por lockfiles vizinhos)
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // Site estático: servimos as imagens direto de /public, sem otimizador.
    unoptimized: true,
  },
}

export default nextConfig
