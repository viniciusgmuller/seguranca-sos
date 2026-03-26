import path from 'path'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config'

const IMAGES_DIR = path.resolve(__dirname, '../../seed/images')

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function uploadImage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  alt: string,
): Promise<number | null> {
  const filePath = path.join(IMAGES_DIR, filename)

  if (!fs.existsSync(filePath)) {
    console.warn(`  [WARN] Image not found, skipping: ${filename}`)
    return null
  }

  // Check if media with same alt already exists
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log(`  [SKIP] Media already exists: ${alt}`)
    return existing.docs[0].id as number
  }

  const mimeMap: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  }
  const ext = path.extname(filename).toLowerCase()
  const mimetype = mimeMap[ext] ?? 'image/jpeg'
  const data = fs.readFileSync(filePath)
  const size = fs.statSync(filePath).size

  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      name: filename,
      mimetype,
      size,
    },
  })

  console.log(`  [OK] Uploaded media: ${alt}`)
  return doc.id as number
}

// ---------------------------------------------------------------------------
// Seed functions
// ---------------------------------------------------------------------------

async function seedSiteConfig(
  payload: Awaited<ReturnType<typeof getPayload>>,
  logoId: number | null,
) {
  console.log('\n--- Seeding SiteConfig ---')

  await payload.updateGlobal({
    slug: 'site-config',
    data: {
      logo: logoId ?? undefined,
      phone: '(54) 3286-5902',
      whatsapp: '(54) 99920-1576',
      email: 'soseventoseservicos@terra.com.br',
      address: 'R. F. G. Bier, 458 - Planalto, Gramado - RS, 95670-000',
      mapCoordinates: { lat: -29.3877278, lng: -50.876722 },
      instagram: 'https://www.instagram.com/sosseguranca_/',
      facebook: '',
      metaTitle:
        'S.O.S Segurança - Segurança para Eventos, Portarias e Postos de Vigilância em Gramado RS',
      metaDescription:
        'Empresa líder em segurança para eventos, portarias e postos de vigilância na Serra Gaúcha. Desde 2002 em Gramado, RS.',
      gaId: '',
    },
  })
  console.log('  [OK] SiteConfig updated')
}

async function seedHeroSection(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n--- Seeding HeroSection ---')

  await payload.updateGlobal({
    slug: 'hero-section',
    data: {
      eyebrow: 'Desde 2002 em Gramado, RS',
      title: 'Segurança para quem não pode parar',
      description:
        'Empresa líder em segurança para eventos, portarias e postos de vigilância na Serra Gaúcha. Comprometimento e responsabilidade desde 2002.',
      ctaText: 'Entrar em Contato',
      stats: [
        { value: '19+', label: 'Anos de mercado' },
        { value: '35+', label: 'Clientes fixos' },
        { value: '20+', label: 'Grandes eventos' },
      ],
    },
  })
  console.log('  [OK] HeroSection updated')
}

async function seedWhySection(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n--- Seeding WhySection ---')

  await payload.updateGlobal({
    slug: 'why-section',
    data: {
      title: 'Por que a S.O.S?',
      description:
        'Temos como objetivo a tranquilidade do nosso cliente, e para alcançarmos tal objetivo trabalhamos com total comprometimento e responsabilidade. Baseamos o nosso serviço na prevenção de incidentes, pois acreditamos que é muito mais viável, para nós e nossos clientes, evitar uma ocorrência do que tomar providências atrasadas.',
      bulletPoints: [
        {
          title: 'Estamos no mercado há 19 anos',
          subtitle: 'Experiência consolidada na Serra Gaúcha',
        },
        {
          title: 'Cursos de qualificação e aperfeiçoamento',
          subtitle: 'Colaboradores constantemente capacitados',
        },
        {
          title: 'Diretor com 15 anos na segurança pública',
          subtitle: 'Ex-policial militar com vasta experiência',
        },
        {
          title: 'Registro na Polícia Federal e no GSVG',
          subtitle: 'Empresa regularizada e certificada',
        },
      ],
    },
  })
  console.log('  [OK] WhySection updated')
}

async function seedHistorySection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  bgId: number | null,
) {
  console.log('\n--- Seeding HistorySection ---')

  await payload.updateGlobal({
    slug: 'history-section',
    data: {
      title: 'História',
      paragraphs: [
        {
          text: 'Começamos fornecendo segurança patrimonial para os vizinhos, a qual era feita de bicicleta, pelo próprio proprietário da empresa. Sempre tivemos o intuito de crescer, então começamos a buscar eventos, e com a ajuda de parceiros na cidade de Gramado conseguimos a oportunidade de mostrar o nosso trabalho.',
        },
        {
          text: 'Nosso primeiro grande evento foi a Festa da Colônia, e desde então não paramos de crescer.',
        },
      ],
      backgroundImage: bgId ?? undefined,
      founders: 'Rodinei, Rosani e Eduardo Cordova — Fundadores',
    },
  })
  console.log('  [OK] HistorySection updated')
}

async function seedSlides(
  payload: Awaited<ReturnType<typeof getPayload>>,
  imageIds: Record<string, number | null>,
) {
  console.log('\n--- Seeding Slides ---')

  const slides = [
    { caption: 'Planeta Atlântida', order: 1, imageKey: 'slide-planeta-atlantida' },
    { caption: 'Natal Luz de Gramado', order: 2, imageKey: 'slide-natal-luz' },
    { caption: 'Festival de Cinema', order: 3, imageKey: 'slide-festival-cinema' },
    { caption: 'Chocofest', order: 4, imageKey: 'slide-chocofest' },
    { caption: 'Eduardo, Rosani e Rodinei', order: 5, imageKey: 'slide-fundadores' },
    { caption: 'Parte da equipe', order: 6, imageKey: 'slide-equipe' },
    { caption: 'Equipe e parte da frota de viaturas', order: 7, imageKey: 'slide-equipe-frota' },
    { caption: 'Parte da frota de viaturas', order: 8, imageKey: 'slide-frota' },
  ]

  for (const slide of slides) {
    const existing = await payload.find({
      collection: 'slides',
      where: { caption: { equals: slide.caption } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  [SKIP] Slide already exists: ${slide.caption}`)
      continue
    }

    const imageId = imageIds[slide.imageKey]
    if (!imageId) {
      console.warn(`  [WARN] No image for slide "${slide.caption}", skipping`)
      continue
    }

    await payload.create({
      collection: 'slides',
      data: {
        caption: slide.caption,
        order: slide.order,
        image: imageId,
      },
    })
    console.log(`  [OK] Created slide: ${slide.caption}`)
  }
}

async function seedServices(
  payload: Awaited<ReturnType<typeof getPayload>>,
  imageIds: Record<string, number | null>,
) {
  console.log('\n--- Seeding Services ---')

  const services = [
    { title: 'Segurança de todos os tipos', order: 1, imageKey: 'service-seguranca' },
    { title: 'Portarias', order: 2, imageKey: 'service-portarias' },
    { title: 'Monitoramento de câmeras', order: 3, imageKey: 'service-monitoramento' },
    { title: 'Limpeza de condomínios e empresas', order: 4, imageKey: 'service-limpeza-cond' },
    { title: 'Serviço de valet', order: 5, imageKey: 'service-valet' },
    { title: 'Vigilância patrimonial', order: 6, imageKey: 'service-vigilancia' },
    { title: 'Brigada de incêndio', order: 7, imageKey: 'service-brigada' },
    { title: 'Limpeza e organização de eventos', order: 8, imageKey: 'service-limpeza-eventos' },
    { title: 'Vigilância armada', order: 9, imageKey: 'service-armada' },
  ]

  for (const service of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { title: { equals: service.title } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  [SKIP] Service already exists: ${service.title}`)
      continue
    }

    const imageId = imageIds[service.imageKey]
    if (!imageId) {
      console.warn(`  [WARN] No image for service "${service.title}", skipping`)
      continue
    }

    await payload.create({
      collection: 'services',
      data: {
        title: service.title,
        order: service.order,
        backgroundImage: imageId,
      },
    })
    console.log(`  [OK] Created service: ${service.title}`)
  }
}

async function seedClients(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n--- Seeding Clients ---')

  const clients: Array<{ name: string; category: 'fixo' | 'evento' | 'parceiro' }> = [
    // Fixed clients
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

    // Events
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

    // Partners
    { name: 'SQUADRA Gestão de Risco', category: 'parceiro' },
    { name: 'RBSTV', category: 'parceiro' },
    { name: 'Prefeitura de Gramado', category: 'parceiro' },
    { name: 'Prefeitura de Canela', category: 'parceiro' },
    { name: 'Gramadotur', category: 'parceiro' },
    { name: 'GramadoSite', category: 'parceiro' },
  ]

  for (const client of clients) {
    const existing = await payload.find({
      collection: 'clients',
      where: { name: { equals: client.name } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  [SKIP] Client already exists: ${client.name}`)
      continue
    }

    await payload.create({
      collection: 'clients',
      data: {
        name: client.name,
        category: client.category,
      },
    })
    console.log(`  [OK] Created client: ${client.name}`)
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function seed() {
  console.log('=== S.O.S Seguranca - Seed Script ===\n')

  const payload = await getPayload({ config })

  try {
    // 1. Upload all images
    console.log('--- Uploading images ---')

    const imageIds: Record<string, number | null> = {}

    const imageManifest: Array<{ key: string; filename: string; alt: string }> = [
      { key: 'logo', filename: 'logo.jpg', alt: 'Logotipo S.O.S Segurança' },
      { key: 'hero-bg', filename: 'hero-bg.png', alt: 'Background hero S.O.S Segurança' },
      { key: 'history-bg', filename: 'history-bg.png', alt: 'Background seção história' },
      {
        key: 'slide-planeta-atlantida',
        filename: 'slide-planeta-atlantida.jpeg',
        alt: 'Planeta Atlântida',
      },
      {
        key: 'slide-natal-luz',
        filename: 'slide-natal-luz.jpeg',
        alt: 'Natal Luz de Gramado',
      },
      {
        key: 'slide-festival-cinema',
        filename: 'slide-festival-cinema.jpeg',
        alt: 'Festival de Cinema',
      },
      { key: 'slide-chocofest', filename: 'slide-chocofest.jpg', alt: 'Chocofest' },
      {
        key: 'slide-fundadores',
        filename: 'slide-fundadores.jpg',
        alt: 'Eduardo, Rosani e Rodinei',
      },
      { key: 'slide-equipe', filename: 'slide-equipe.jpg', alt: 'Parte da equipe' },
      {
        key: 'slide-equipe-frota',
        filename: 'slide-equipe-frota.jpg',
        alt: 'Equipe e parte da frota de viaturas',
      },
      {
        key: 'slide-frota',
        filename: 'slide-frota.jpg',
        alt: 'Parte da frota de viaturas',
      },
      {
        key: 'service-seguranca',
        filename: 'service-seguranca.png',
        alt: 'Segurança de todos os tipos',
      },
      { key: 'service-portarias', filename: 'service-portarias.png', alt: 'Portarias' },
      {
        key: 'service-monitoramento',
        filename: 'service-monitoramento.png',
        alt: 'Monitoramento de câmeras',
      },
      {
        key: 'service-limpeza-cond',
        filename: 'service-limpeza-cond.png',
        alt: 'Limpeza de condomínios e empresas',
      },
      { key: 'service-valet', filename: 'service-valet.png', alt: 'Serviço de valet' },
      {
        key: 'service-vigilancia',
        filename: 'service-vigilancia.png',
        alt: 'Vigilância patrimonial',
      },
      {
        key: 'service-brigada',
        filename: 'service-brigada.png',
        alt: 'Brigada de incêndio',
      },
      {
        key: 'service-limpeza-eventos',
        filename: 'service-limpeza-eventos.png',
        alt: 'Limpeza e organização de eventos',
      },
      { key: 'service-armada', filename: 'service-armada.png', alt: 'Vigilância armada' },
    ]

    for (const img of imageManifest) {
      try {
        imageIds[img.key] = await uploadImage(payload, img.filename, img.alt)
      } catch (err) {
        console.error(`  [ERROR] Failed to upload ${img.filename}:`, err)
        imageIds[img.key] = null
      }
    }

    // 2. Seed globals
    await seedSiteConfig(payload, imageIds['logo'])
    await seedHeroSection(payload)
    await seedWhySection(payload)
    await seedHistorySection(payload, imageIds['history-bg'])

    // 3. Seed collections
    await seedSlides(payload, imageIds)
    await seedServices(payload, imageIds)
    await seedClients(payload)

    console.log('\n=== Seed complete! ===')
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }

  process.exit(0)
}

seed()
