// ---------------------------------------------------------------------------
// Conteúdo do site S.O.S Segurança (site estático — sem CMS).
// Para editar textos, fotos, serviços, clientes ou a galeria, mexa AQUI.
// As imagens ficam em /public/media (referência começa com "/media/...").
// ---------------------------------------------------------------------------

export type ClientCategory = 'fixo' | 'evento' | 'parceiro'

export const siteConfig = {
  phone: '(54) 99944-0370',
  whatsapp: '(54) 99920-1576',
  email: 'soseventoseservicos@terra.com.br',
  address: 'R. F. G. Bier, 458 - Planalto, Gramado - RS, 95670-000',
  mapCoordinates: { lat: -29.3877278, lng: -50.876722 },
  instagram: 'https://www.instagram.com/sosseguranca_/',
  facebook: '',
  logo: '/media/logo.jpg',
  metaTitle:
    'S.O.S Segurança - Segurança para Eventos, Portarias e Postos de Vigilância em Gramado RS',
  metaDescription:
    'Empresa líder em segurança para eventos, portarias e postos de vigilância na Serra Gaúcha. Desde 2002 em Gramado, RS.',
}

export const hero = {
  eyebrow: 'Desde 2002 em Gramado, RS',
  title: 'Segurança para quem não pode parar',
  description:
    'Empresa líder em segurança para eventos, portarias e postos de vigilância na Serra Gaúcha. Comprometimento e responsabilidade desde 2002.',
  ctaText: 'Falar no WhatsApp',
  backgroundImage: '/media/hero-bg.png',
  stats: [
    { value: '20+', label: 'Anos de mercado' },
    { value: '25+', label: 'Clientes fixos' },
    { value: '20+', label: 'Grandes eventos' },
  ],
}

export const why = {
  title: 'Por que a S.O.S?',
  description:
    'Temos como objetivo a tranquilidade do nosso cliente, e para alcançarmos tal objetivo trabalhamos com total comprometimento e responsabilidade. Baseamos o nosso serviço na prevenção de incidentes, pois acreditamos que é muito mais viável, para nós e nossos clientes, evitar uma ocorrência do que tomar providências atrasadas.',
  bulletPoints: [
    {
      title: 'Mais de 20 anos no mercado',
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
}

export const history = {
  title: 'História',
  paragraphs: [
    {
      text: 'Começamos fornecendo segurança patrimonial para os vizinhos, a qual era feita de bicicleta, pelo próprio proprietário da empresa. Sempre tivemos o intuito de crescer, então começamos a buscar eventos, e com a ajuda de parceiros na cidade de Gramado conseguimos a oportunidade de mostrar o nosso trabalho.',
    },
    {
      text: 'Nosso primeiro grande evento foi a Festa da Colônia, e desde então não paramos de crescer.',
    },
  ],
  founders: 'Rodinei, Rosani e Eduardo Cordova — Fundadores',
}

export type Service = { title: string; image: string }

export const services: Service[] = [
  { title: 'Segurança de todos os tipos', image: '/media/service-seguranca.png' },
  { title: 'Portarias', image: '/media/service-portarias.png' },
  { title: 'Monitoramento de câmeras', image: '/media/service-monitoramento.png' },
  { title: 'Limpeza de condomínios e empresas', image: '/media/service-limpeza-cond.png' },
  { title: 'Serviço de valet', image: '/media/service-valet.png' },
  { title: 'Vigilância patrimonial', image: '/media/service-vigilancia.png' },
  { title: 'Brigada de incêndio', image: '/media/service-brigada.png' },
  { title: 'Limpeza e organização de eventos', image: '/media/service-limpeza-eventos.png' },
  { title: 'Vigilância armada', image: '/media/service-armada.png' },
]

export type GalleryItem = { caption: string; image: string }

// Galeria "Nosso trabalho". Para trocar legenda, edite o campo caption.
export const gallery: GalleryItem[] = [
  { caption: 'Nossa base — Gramado', image: '/media/galeria/g01-base-frota.jpg' },
  { caption: 'Equipe S.O.S na base', image: '/media/galeria/g03-base-equipe.jpg' },
  { caption: 'Planeta Atlântida', image: '/media/galeria/g12-planeta-atlantida.jpg' },
  { caption: 'Segurança de eventos', image: '/media/galeria/g13-evento-montagem.jpg' },
  { caption: 'Segurança de eventos', image: '/media/galeria/g04-evento-show.jpg' },
  { caption: 'Connection — Terroirs do Brasil', image: '/media/galeria/g10-connection.jpg' },
  { caption: 'Parque do Caracol — Canela', image: '/media/galeria/g05-parque-caracol.jpg' },
  { caption: 'Grupo RBS', image: '/media/galeria/g06-grupo-rbs.jpg' },
  { caption: 'Portaria e vigilância', image: '/media/galeria/g11-portaria-hotel.jpg' },
  { caption: 'Portaria e vigilância', image: '/media/galeria/g08-portaria-vigilancia.jpg' },
  { caption: 'Nossa equipe', image: '/media/galeria/g07-equipe-grande.jpg' },
  { caption: 'Equipe e frota', image: '/media/galeria/g09-equipe-frota.jpg' },
  { caption: 'Nossa equipe', image: '/media/galeria/g02-equipe-parque.jpg' },
]

export type Client = { name: string; category: ClientCategory }

export const clients: Client[] = [
  // Clientes fixos
  // Hotéis
  { name: 'Hotel Alpestre', category: 'fixo' },
  { name: 'Hotéis Casa da Montanha', category: 'fixo' },
  { name: 'Hotel Rita Höppner', category: 'fixo' },
  { name: 'Hard Rock Café', category: 'fixo' },
  { name: 'Hard Rock Hotel', category: 'fixo' },
  { name: 'Hotel Serrano', category: 'fixo' },
  { name: 'Golden Hotel', category: 'fixo' },
  { name: 'Hotel e Resort Divisa', category: 'fixo' },
  { name: 'Hotel Sesc', category: 'fixo' },
  { name: 'Hotel Serra Nevada', category: 'fixo' },
  // Parques e atrações
  { name: 'Gramado Zoo', category: 'fixo' },
  { name: 'Snowland', category: 'fixo' },
  { name: 'Acqua Motion', category: 'fixo' },
  { name: 'Parque do Caracol', category: 'fixo' },
  { name: 'Alpen Park', category: 'fixo' },
  { name: 'Parque da NASA', category: 'fixo' },
  { name: 'NBA Parque', category: 'fixo' },
  { name: 'Mini Mundo', category: 'fixo' },
  // Construtoras
  { name: 'Construtora PRG', category: 'fixo' },
  { name: 'Construtora Afonso Imóveis', category: 'fixo' },
  { name: 'Construtora Linha Bonita', category: 'fixo' },
  // Condomínios
  { name: 'Condomínio Laken', category: 'fixo' },
  { name: 'Condomínio Quinta do Palácio', category: 'fixo' },
  { name: 'Condomínio Parque da Figueira', category: 'fixo' },
  { name: 'Condomínio Pinheiro Grosso', category: 'fixo' },
  { name: 'Condomínio Quinta da Serra', category: 'fixo' },

  // Grandes eventos
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

  // Parceiros
  { name: 'SQUADRA Gestão de Risco', category: 'parceiro' },
  { name: 'RBSTV', category: 'parceiro' },
  { name: 'Prefeitura de Gramado', category: 'parceiro' },
  { name: 'Prefeitura de Canela', category: 'parceiro' },
  { name: 'Gramadotur', category: 'parceiro' },
  { name: 'GramadoSite', category: 'parceiro' },
]
