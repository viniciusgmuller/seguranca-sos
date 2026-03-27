import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SEED_SECRET = process.env.PAYLOAD_SECRET

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (!secret || secret !== SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const results: string[] = []

  try {
    // 1. Seed SiteConfig
    await payload.updateGlobal({
      slug: 'site-config',
      data: {
        phone: '(54) 3286-5902',
        whatsapp: '(54) 99920-1576',
        email: 'soseventoseservicos@terra.com.br',
        address: 'R. F. G. Bier, 458 - Planalto, Gramado - RS, 95670-000',
        mapCoordinates: { lat: -29.3877278, lng: -50.876722 },
        instagram: 'https://www.instagram.com/sosseguranca_/',
        facebook: '',
        metaTitle: 'S.O.S Segurança - Segurança para Eventos, Portarias e Postos de Vigilância em Gramado RS',
        metaDescription: 'Empresa líder em segurança para eventos, portarias e postos de vigilância na Serra Gaúcha. Desde 2002 em Gramado, RS.',
        gaId: '',
      },
    })
    results.push('SiteConfig updated')

    // 2. Seed HeroSection
    await payload.updateGlobal({
      slug: 'hero-section',
      data: {
        eyebrow: 'Desde 2002 em Gramado, RS',
        title: 'Segurança para quem não pode parar',
        description: 'Empresa líder em segurança para eventos, portarias e postos de vigilância na Serra Gaúcha. Comprometimento e responsabilidade desde 2002.',
        ctaText: 'Entrar em Contato',
        stats: [
          { value: '19+', label: 'Anos de mercado' },
          { value: '35+', label: 'Clientes fixos' },
          { value: '20+', label: 'Grandes eventos' },
        ],
      },
    })
    results.push('HeroSection updated')

    // 3. Seed WhySection
    await payload.updateGlobal({
      slug: 'why-section',
      data: {
        title: 'Por que a S.O.S?',
        description: 'Temos como objetivo a tranquilidade do nosso cliente, e para alcançarmos tal objetivo trabalhamos com total comprometimento e responsabilidade. Baseamos o nosso serviço na prevenção de incidentes, pois acreditamos que é muito mais viável, para nós e nossos clientes, evitar uma ocorrência do que tomar providências atrasadas.',
        bulletPoints: [
          { title: 'Estamos no mercado há 19 anos', subtitle: 'Experiência consolidada na Serra Gaúcha' },
          { title: 'Cursos de qualificação e aperfeiçoamento', subtitle: 'Colaboradores constantemente capacitados' },
          { title: 'Diretor com 15 anos na segurança pública', subtitle: 'Ex-policial militar com vasta experiência' },
          { title: 'Registro na Polícia Federal e no GSVG', subtitle: 'Empresa regularizada e certificada' },
        ],
      },
    })
    results.push('WhySection updated')

    // 4. Seed HistorySection
    await payload.updateGlobal({
      slug: 'history-section',
      data: {
        title: 'História',
        paragraphs: [
          { text: 'Começamos fornecendo segurança patrimonial para os vizinhos, a qual era feita de bicicleta, pelo próprio proprietário da empresa. Sempre tivemos o intuito de crescer, então começamos a buscar eventos, e com a ajuda de parceiros na cidade de Gramado conseguimos a oportunidade de mostrar o nosso trabalho.' },
          { text: 'Nosso primeiro grande evento foi a Festa da Colônia, e desde então não paramos de crescer.' },
        ],
        founders: 'Rodinei, Rosani e Eduardo Cordova — Fundadores',
      },
    })
    results.push('HistorySection updated')

    // 5. Seed Services (without images)
    const services = [
      { title: 'Segurança de todos os tipos', order: 1 },
      { title: 'Portarias', order: 2 },
      { title: 'Monitoramento de câmeras', order: 3 },
      { title: 'Limpeza de condomínios e empresas', order: 4 },
      { title: 'Serviço de valet', order: 5 },
      { title: 'Vigilância patrimonial', order: 6 },
      { title: 'Brigada de incêndio', order: 7 },
      { title: 'Limpeza e organização de eventos', order: 8 },
      { title: 'Vigilância armada', order: 9 },
    ]

    for (const service of services) {
      const existing = await payload.find({
        collection: 'services',
        where: { title: { equals: service.title } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'services', data: service })
        results.push(`Service created: ${service.title}`)
      } else {
        results.push(`Service exists: ${service.title}`)
      }
    }

    // 6. Seed Slides (without images)
    const slides = [
      { caption: 'Planeta Atlântida', order: 1 },
      { caption: 'Natal Luz de Gramado', order: 2 },
      { caption: 'Festival de Cinema', order: 3 },
      { caption: 'Chocofest', order: 4 },
      { caption: 'Eduardo, Rosani e Rodinei', order: 5 },
      { caption: 'Parte da equipe', order: 6 },
      { caption: 'Equipe e parte da frota de viaturas', order: 7 },
      { caption: 'Parte da frota de viaturas', order: 8 },
    ]

    for (const slide of slides) {
      const existing = await payload.find({
        collection: 'slides',
        where: { caption: { equals: slide.caption } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'slides', data: slide })
        results.push(`Slide created: ${slide.caption}`)
      } else {
        results.push(`Slide exists: ${slide.caption}`)
      }
    }

    // 7. Seed Clients
    const clients: Array<{ name: string; category: 'fixo' | 'evento' | 'parceiro' }> = [
      { name: 'Alpen Park', category: 'fixo' },
      { name: 'Mini-mundo', category: 'fixo' },
      { name: 'Gramado Zoo', category: 'fixo' },
      { name: 'Snowland', category: 'fixo' },
      { name: 'Hard Rock Cafe', category: 'fixo' },
      { name: 'Hollywood Dream Cars', category: 'fixo' },
      { name: 'Mundo de Chocolate', category: 'fixo' },
      { name: 'Rasen Bier', category: 'fixo' },
      { name: 'Le Jardin Parque de Lavanda', category: 'fixo' },
      { name: 'GramadoZoo Aquarium', category: 'fixo' },
      { name: 'Museu de Cera', category: 'fixo' },
      { name: 'Super Carros', category: 'fixo' },
      { name: 'Condomínio Serrano', category: 'fixo' },
      { name: 'Condomínio Laje de Pedra', category: 'fixo' },
      { name: 'Condomínio Alpes de São Francisco', category: 'fixo' },
      { name: 'Condomínio Aspen Mountain', category: 'fixo' },
      { name: 'Hotel Laghetto', category: 'fixo' },
      { name: 'Hotel Continental', category: 'fixo' },
      { name: 'Wyndham Gramado Termas Resort', category: 'fixo' },
      { name: 'Hotel Sky', category: 'fixo' },
      { name: 'Hotel Wish', category: 'fixo' },
      { name: 'Hotel Farina Park', category: 'fixo' },
      { name: 'Hotel Valle D\'incanto', category: 'fixo' },
      { name: 'Hotel Klein Ville', category: 'fixo' },
      { name: 'Hotel Pousada Natur', category: 'fixo' },
      { name: 'Hotel Kurotel', category: 'fixo' },
      { name: 'Vinícola Ravanello', category: 'fixo' },
      { name: 'Vinícola Jolimont', category: 'fixo' },
      { name: 'Tramontina Store', category: 'fixo' },
      { name: 'Galeria Irmãos Elétrica', category: 'fixo' },
      { name: 'Florybal Chocolates', category: 'fixo' },
      { name: 'Mundo do Chocolate Lugano', category: 'fixo' },
      { name: 'Pravaler Gramado', category: 'fixo' },
      { name: 'Caminhos de Pedra', category: 'fixo' },
      { name: 'Cervejaria Rasen Bier', category: 'fixo' },
      { name: 'Natal Luz de Gramado', category: 'evento' },
      { name: 'Planeta Atlântida', category: 'evento' },
      { name: 'UFC', category: 'evento' },
      { name: 'Copa do Mundo Beira Rio', category: 'evento' },
      { name: 'Chocofest', category: 'evento' },
      { name: 'Festival de Cinema de Gramado', category: 'evento' },
      { name: 'Festa da Colônia', category: 'evento' },
      { name: 'Jaguariúna Rodeo Festival', category: 'evento' },
      { name: 'Réveillon de Gramado', category: 'evento' },
      { name: 'Encontro de Motociclistas Gramado', category: 'evento' },
      { name: 'Natal Imperial Petrópolis', category: 'evento' },
      { name: 'Festival Vale dos Vinhedos', category: 'evento' },
      { name: 'Festuris', category: 'evento' },
      { name: 'Festival Gastronômico de Gramado', category: 'evento' },
      { name: 'Gramado in Concert', category: 'evento' },
      { name: 'Chocofest Winter', category: 'evento' },
      { name: 'Festival de Inverno Campos do Jordão', category: 'evento' },
      { name: 'Expobento', category: 'evento' },
      { name: 'Festival de Balonismo', category: 'evento' },
      { name: 'Oktoberfest', category: 'evento' },
      { name: 'SQUADRA Gestão de Risco', category: 'parceiro' },
      { name: 'RBSTV', category: 'parceiro' },
      { name: 'Prefeitura de Gramado', category: 'parceiro' },
      { name: 'Prefeitura de Canela', category: 'parceiro' },
      { name: 'Gramadotur', category: 'parceiro' },
      { name: 'GramadoSite', category: 'parceiro' },
    ]

    let clientsCreated = 0
    let clientsSkipped = 0
    for (const client of clients) {
      const existing = await payload.find({
        collection: 'clients',
        where: { name: { equals: client.name } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'clients', data: client })
        clientsCreated++
      } else {
        clientsSkipped++
      }
    }
    results.push(`Clients: ${clientsCreated} created, ${clientsSkipped} skipped`)

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error), results }, { status: 500 })
  }
}
