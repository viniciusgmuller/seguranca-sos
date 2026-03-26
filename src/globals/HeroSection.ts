import type { GlobalConfig } from 'payload'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Seção Hero',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Texto superior (eyebrow)',
      type: 'text',
      required: true,
      defaultValue: 'Desde 2002 em Gramado, RS',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      required: true,
    },
    {
      name: 'backgroundImage',
      label: 'Imagem de Fundo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaText',
      label: 'Texto do Botão CTA',
      type: 'text',
      required: true,
      defaultValue: 'Entrar em Contato',
    },
    {
      name: 'stats',
      label: 'Estatísticas',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'value',
          label: 'Valor',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
